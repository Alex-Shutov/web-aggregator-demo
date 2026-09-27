import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { DemoRestrictionGuard } from '@app/auth/guards/demoRestriction.guard';
import { UserModule } from '@app/user/user.module';

@Module({
  imports:[forwardRef(()=>UserModule)],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,DemoRestrictionGuard],
  exports:[AuthService,AuthGuard,DemoRestrictionGuard]
})
export class AuthModule {}
