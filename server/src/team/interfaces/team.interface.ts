import { EventEntity } from '@app/event/entities/event.entity';
import { UserEntity } from '@app/user/entities/user.entity';

export interface TeamResponse {
  id: string;
  name: string;
  members: UserEntity[];
  event: EventEntity | null;
  projectId?: string | null;
}

/** [userId, projectRoleId] */
export type TeamMemberAssignment = [string, string];
