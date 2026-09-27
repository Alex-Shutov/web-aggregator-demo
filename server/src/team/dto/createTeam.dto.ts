import { IsArray, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TeamMemberAssignment } from '@app/team/interfaces/team.interface';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Пары [userId, projectRoleId]',
    example: [['user-uuid', 'role-uuid']],
  })
  @IsArray()
  memberIds: TeamMemberAssignment[];

  @ApiProperty()
  @IsUUID()
  eventId: string;
}
