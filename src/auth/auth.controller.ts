import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParamsLogin, ParamsRegis } from '../dto/auth';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ResponseSuccess } from '../utils/handle-response-data';
import { FastifyReply } from 'fastify';
import { JwtPayloadDto } from './strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() data: ParamsLogin,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const handleCookies = (access: string, refresh: string): void => {
      response.setCookie('access_token', access);
      response.setCookie('refresh_token', refresh);
    };
    return this.authService.handleSignIn(data, handleCookies);
  }

  @Post('regis')
  register(
    @Body() data: ParamsRegis,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const handleCookies = (access: string, refresh: string): void => {
      response.setCookie('access_token', access);
      response.setCookie('refresh_token', refresh);
    };
    return this.authService.handleSignUp(data, handleCookies);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  profile(@Req() request: Request) {
    const payload: JwtPayloadDto | any = {
      ...request.user,
    };
    return this.authService.handleProfile(payload);
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    response.setCookie('access_token', `${request.user}`);
    return ResponseSuccess(HttpStatus.OK, 'Refresh token successful!', null);
  }
}
