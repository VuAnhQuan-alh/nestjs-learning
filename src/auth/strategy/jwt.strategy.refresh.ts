import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './index';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private config: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: JwtPayloadDto): Promise<string> {
    return this.authService.signAccessToken(payload);
  }
}
