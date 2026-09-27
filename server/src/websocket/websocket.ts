import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ProjectRatingDto } from '@app/websocket/dto/projectRating.dto';
import { CloseVotingDto } from '@app/websocket/dto/closeVoting.dto';
import { Server, Socket } from 'socket.io';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { GradeService } from '@app/grade/grade.service';
import { EventService } from '@app/event/event.service';
import { UserService } from '@user/user.service';
import { JwtPayload } from '@app/auth/interfaces/jwt-payload.interface';
import { UserEntity } from '@user/entities/user.entity';
import { IEventStatus } from '@app/event/constants/event.constants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ProjectWebSocket implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private gradeService: GradeService;
  private eventService: EventService;
  private userService: UserService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.gradeService = this.moduleRef.get(GradeService, { strict: false });
    this.eventService = this.moduleRef.get(EventService, { strict: false });
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.toString().split(' ')[1];

    if (!token) {
      client.data.user = null;
      client.data.isDemo = false;
      return;
    }

    try {
      const decoded = verify(
        token,
        this.configService.get<string>('JWT_KEY'),
      ) as JwtPayload;
      client.data.user = await this.userService.findOne({ id: decoded.id });
      client.data.isDemo = !!decoded.isDemo;
    } catch {
      client.data.user = null;
      client.data.isDemo = false;
    }
  }

  handleDisconnect(client: Socket) {
    client.data.user = null;
  }

  private getSocketUser(client: Socket): UserEntity | null {
    return client.data?.user ?? null;
  }

  @SubscribeMessage('socket.rateProject')
  async rateProject(
    @ConnectedSocket() client: Socket,
    @MessageBody() { projectId, eventId }: ProjectRatingDto,
  ) {
    const user = this.getSocketUser(client);
    if (!user?.id) {
      client.emit('error', 'Не авторизован');
      return;
    }
    if (client.data?.isDemo) {
      client.emit('error', 'Демо-режим: это действие недоступно');
      return;
    }
    try {
      const gradeProject = await this.gradeService.rateProject(projectId, user.id, eventId);
      this.server.emit('projectRated', gradeProject);
      return gradeProject;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка голосования';
      client.emit('error', message);
    }
  }

  @SubscribeMessage('socket.closeVoting')
  async closeVoting(
    @ConnectedSocket() client: Socket,
    @MessageBody() { eventId }: CloseVotingDto,
  ) {
    if (!eventId) {
      client.emit('error', 'eventId обязателен');
      return;
    }
    try {
      const event = await this.eventService.changeStatus(eventId, {
        status: IEventStatus.CLOSE_VOTE,
      });
      this.server.emit('eventStatusChanged', { event });
      return { event };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка смены статуса';
      client.emit('error', message);
    }
  }
}
