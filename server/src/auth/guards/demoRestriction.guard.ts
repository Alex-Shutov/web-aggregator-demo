import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserReqeustMiddleware } from '@auth/interfaces/UserReqeustMiddleware';

@Injectable()
export class DemoRestrictionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserReqeustMiddleware>();
    if (request.isDemo) {
      throw new HttpException(
        'Демо-режим: это действие недоступно',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
