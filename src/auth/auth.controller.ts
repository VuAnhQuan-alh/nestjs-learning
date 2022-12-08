import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParamsLogin } from '../dto/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(): string {
    const data: ParamsLogin = {
      identifier: 'quanVa',
      password: '123456',
    };
    return this.authService.signIn(data);
  }
  @Post('regis')
  register(): string {
    return this.authService.signUp();
  }
  @Get('me')
  profile(): string {
    return this.authService.getProfile();
  }
}
