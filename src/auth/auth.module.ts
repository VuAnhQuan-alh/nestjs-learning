import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, JwtStrategyRefresh } from './strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtStrategyRefresh],
})
export class AuthModule {}
