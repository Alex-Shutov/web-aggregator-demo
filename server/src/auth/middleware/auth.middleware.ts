import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserReqeustMiddleware } from '@app/auth/interfaces/UserReqeustMiddleware';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/user/user.service';
import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { JwtPayload } from '@app/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async use(req: UserReqeustMiddleware, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!authHeader || !token || token === 'undefined' || token === 'null') {
      req.user = null;
      req.isDemo = false;
      next();
      return;
    }

    try {
      const decode = verify(
        token,
        this.configService.get<string>('JWT_KEY'),
      ) as JwtPayload;
      const user = await this.userService.findOne({ id: decode.id });
      req.user = user;
      req.isDemo = !!decode.isDemo;
    } catch {
      req.user = null;
      req.isDemo = false;
    }
    next();
  }
}
