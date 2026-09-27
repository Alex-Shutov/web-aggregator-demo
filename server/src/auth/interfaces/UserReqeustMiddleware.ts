import { UserEntity } from '@app/user/entities/user.entity';
import { Request } from 'express';

export interface UserReqeustMiddleware extends Request {
  user: UserEntity | null;
  isDemo?: boolean;
}
