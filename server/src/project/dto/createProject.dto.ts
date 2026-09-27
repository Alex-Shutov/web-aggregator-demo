import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PROJECT_STATUSES } from '@app/project/constants/project.constants';

export class CreateProjectDto {
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  howToPlay?: string;

  @IsOptional()
  @ApiProperty()
  gitLink?: string;

  @ApiProperty({ required: false, enum: PROJECT_STATUSES })
  @IsOptional()
  status?: PROJECT_STATUSES;

  @ApiProperty()
  @IsOptional()
  teamId?: string;
}
