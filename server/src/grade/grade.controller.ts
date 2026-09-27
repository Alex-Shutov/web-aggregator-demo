import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from '@user/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { DemoRestrictionGuard } from '@app/auth/guards/demoRestriction.guard';

@Controller('rate')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {
  }

  @Post()
  @UseGuards(AuthGuard, DemoRestrictionGuard)
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  findAll() {
    return this.gradeService.findAll();
  }

  @Get('balance')
  @UseGuards(AuthGuard)
  getBalance(@Query('eventId') eventId: string, @User('id') userId: string) {
    return this.gradeService.getUserFires(eventId, userId);
  }

  @Get('by-event')
  @UseGuards(AuthGuard)
  findByQuery(@Query('eventId') eventId: string, @User('id') userId: string) {
    return this.gradeService.findAllByQuery(eventId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(+id);
  }

  @Post('/project/:projectId')
  @UseGuards(AuthGuard, DemoRestrictionGuard)
  async rateProject(@Param('projectId') projectId: string,
                    @Query('eventId') eventId:string,
                    @User('id') userId: string,
  ) {
    const grade = await this.gradeService.rateProject(projectId, userId,eventId);
    return this.gradeService.createResponse(grade.grade);
  }
}
