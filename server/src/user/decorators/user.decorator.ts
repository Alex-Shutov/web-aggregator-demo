import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserReqeustMiddleware } from '@app/auth/interfaces/UserReqeustMiddleware';
import { Socket } from 'socket.io';

type UserProperty = keyof UserEntity;

export const User = createParamDecorator(
  (data: UserProperty | undefined, ctx: ExecutionContext) => {
    const contextType = ctx.getType<'http' | 'ws' | 'rpc'>();
    const user: UserEntity | null =
      contextType === 'ws'
        ? (ctx.switchToWs().getClient<Socket>()?.data?.user as UserEntity | null)
        : ctx.switchToHttp().getRequest<UserReqeustMiddleware>()?.user;

    if (!user) {
      return null;
    }
    if (data) {
      return user[data];
    }
    return user;
  },
);
