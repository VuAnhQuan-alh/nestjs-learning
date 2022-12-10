import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParamsLogin, ParamsRegis } from '../dto/auth';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ResponseSuccess } from '../utils/handle-response-data';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: ParamsLogin) {
    return this.authService.handleSignIn(data);
  }

  @Post('regis')
  register(@Body() data: ParamsRegis) {
    return this.authService.handleSignUp(data);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  profile(@Req() request: Request) {
    return ResponseSuccess(
      HttpStatus.OK,
      'Sign profile successful!',
      request.user,
    );
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@Req() request: Request) {
    return ResponseSuccess(HttpStatus.OK, 'Refresh token successful!', {
      accessToken: request.user,
    });
  }
}
