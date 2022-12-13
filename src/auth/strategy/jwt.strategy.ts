import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './index';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private config: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
    });
  }
  async validate(payload: JwtPayloadDto) {
    const account = await this.userModel.findOne({ _id: payload.sub });
    const { username, email, avatar, content, confirmed } = account;
    return { confirmed, username, email, avatar, content };
  }
}
