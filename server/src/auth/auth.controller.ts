import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { UrfuLoginDto } from '@app/auth/dto/urfuLogin.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '@app/user/interfaces/user.interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body('credentials') signUpDto: UrfuLoginDto): Promise<UserResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  async signIn(@Body('credentials') signInDto: UrfuLoginDto): Promise<UserResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('demo')
  async demo(): Promise<UserResponse> {
    return this.authService.demoLogin();
  }

  @Post('logout')
  async logout(): Promise<{ success: boolean }> {
    return { success: true };
  }

  @Post('loginUrfu')
  async signUpForUrfu(@Body('credentials') loginUserDto: UrfuLoginDto): Promise<UserResponse> {
    return this.authService.loginUrfu(loginUserDto);
  }
}
