import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { ProjectModule } from '@app/project/project.module';
import { EventModule } from '@app/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from '@app/grade/entities/grade.entity';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { DemoRestrictionGuard } from '@app/auth/guards/demoRestriction.guard';

@Module({
  exports:[GradeService],
  controllers: [GradeController],
  providers: [GradeService, AuthGuard, DemoRestrictionGuard],
  imports:[ProjectModule,EventModule,TypeOrmModule.forFeature([GradeEntity])]
})
export class GradeModule {}
