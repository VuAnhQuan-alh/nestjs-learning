import { Types } from 'mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export * from './jwt.strategy';
export * from './jwt.strategy.refresh';

export class JwtPayloadDto {
  @IsNotEmpty()
  sub: Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  iat?: number;

  @IsOptional()
  @IsNumber()
  exp?: number;
}
