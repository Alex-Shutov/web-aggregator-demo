import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@app/event/entities/event.entity';
import { Repository } from 'typeorm';
import { IEventStatus } from '@app/event/constants/event.constants';
import { ProjectEntity } from '@app/project/entities/project.entity';
import { GradeEntity } from '@app/grade/entities/grade.entity';
import { ProjectResponse } from '@app/project/interfaces/project.interface';
import { GradeResponse } from '@app/grade/interfaces/grade.interface';
import { EventService } from '@app/event/event.service';
import { ProjectService } from '@app/project/project.service';

@Injectable()
export class GradeService {

  constructor(
    private readonly eventService: EventService,
    private readonly projectService: ProjectService,
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
  ) {
  }

  create(createGradeDto: CreateGradeDto) {
    return 'This action adds a new grade';
  }

  findAll() {
    return `This action returns all grade`;
  }

  async findAllByQuery(eventId:string,userId:string,projectId?:string){
    return this.gradeRepository
      .createQueryBuilder('grade')
      .where('grade."eventId" = :eventId', { eventId })
      .andWhere('grade."userId" = :userId', { userId })
      .getMany();
  }

  async getUserFires(eventId: string, userId: string): Promise<{ fires: number }> {
    const grade = await this.gradeRepository
      .createQueryBuilder('grade')
      .where('grade."eventId" = :eventId', { eventId })
      .andWhere('grade."userId" = :userId', { userId })
      .getOne();
    return { fires: grade?.fires ?? 15 };
  }

  findOne(id: string) {
    return this.gradeRepository.findOneBy({id})
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }

  async rateProject(projectId: string, userId: string,eventId?:string) {

    function patchGrade(oldGrade: GradeEntity) {
      if (oldGrade.fires >= 5) {
        oldGrade.fires -= 5
        return oldGrade
      } else throw new HttpException('Вы не можете оценить проект, так как кол-во ваших огоньков равно 0 :(', HttpStatus.CONFLICT)
    }

    function createNewGrade() {
      const grade = new GradeEntity()
      grade.event = currentEvent.id
      grade.fires = 10
      grade.user = userId
      grade.project = projectId
      return grade
    }

    const currentEvent = await this.eventService.findOne({
      status: IEventStatus.OPENED
    })
    if (currentEvent.status === IEventStatus.OPENED) {
      const project = await this.projectService.findOne(projectId)
      const grade = await this.gradeRepository.findOneBy({ user: userId, event: currentEvent.id })
      const gradeToSave = grade ? patchGrade(grade) : createNewGrade()
      project.rating += 5
      await this.gradeRepository.save(gradeToSave)
      await this.projectService.save(project)
      return {grade: gradeToSave, project}
    }
  }

  createResponse(grade: GradeEntity): GradeResponse {
    return {
      grade: grade
    }
  }
}

