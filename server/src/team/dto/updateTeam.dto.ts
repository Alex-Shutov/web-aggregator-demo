import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TeamMemberAssignment } from '@app/team/interfaces/team.interface';

export class UpdateTeamDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Пары [userId, projectRoleId]',
  })
  @IsArray()
  @IsOptional()
  memberIds?: TeamMemberAssignment[];
}
