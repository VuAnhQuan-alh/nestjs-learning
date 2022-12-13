import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ParamsLogin, ParamsRegis, Token } from '../dto/auth';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema';
import { Model, Types } from 'mongoose';
import { ResponseError, ResponseSuccess } from '../utils/handle-response-data';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async handleSignIn(
    data: ParamsLogin,
    handleCookies: (access: string, refresh: string) => void,
  ) {
    try {
      const { identifier, password } = data;
      const account = await this.userModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
      if (!account) {
        return ResponseError(
          HttpStatus.BAD_REQUEST,
          'Identifier does not exist!',
          'Not found identifier.',
        );
      }
      const isMatched = await argon.verify(account.hash_password, password);
      if (!isMatched) {
        return ResponseError(
          HttpStatus.BAD_REQUEST,
          'Password is wrong!',
          'Unauthorized.',
        );
      }

      const { username, email, content, avatar, _id, confirmed } = account;
      const token = await this.signToken(_id, email);
      handleCookies(token.accessToken, token.refreshToken);

      return ResponseSuccess(HttpStatus.OK, 'Login successful!', {
        user: {
          username,
          email,
          content,
          avatar,
          confirmed,
        },
      });
    } catch (e) {
      return ResponseError(HttpStatus.FORBIDDEN, 'Sign in failed!', e.message);
    }
  }

  async handleSignUp(
    data: ParamsRegis,
    handleCookies: (access: string, refresh: string) => void,
  ) {
    try {
      const { username, email, password } = data;
      const hash = await argon.hash(password);
      const account = await this.userModel.create({
        username,
        email,
        hash_password: hash,
      });

      const token = await this.signToken(account._id, email);
      handleCookies(token.accessToken, token.refreshToken);

      return ResponseSuccess(
        HttpStatus.CREATED,
        'Created new an account successful!',
        {
          user: {
            username: account.username,
            email: account.email,
            avatar: account.avatar,
            content: account.content,
            confirmed: account.confirmed,
          },
        },
      );
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  async signToken(userId: Types.ObjectId, email: string): Promise<Token> {
    try {
      const payload: JwtPayloadDto = {
        sub: userId,
        email,
      };
      const accessToken = await this.jwt.signAsync(payload, {
        expiresIn: '30m',
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });
      const refreshToken = await this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  async signAccessToken(payload: JwtPayloadDto): Promise<string> {
    try {
      return await this.jwt.signAsync(
        { sub: payload.sub, email: payload.email },
        {
          expiresIn: '30m',
          secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        },
      );
    } catch (e) {
      throw new RequestTimeoutException();
    }
  }
}
