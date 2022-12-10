import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ParamsLogin {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(6)
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  @MinLength(6)
  password: string;
}

export class ParamsRegis {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  @MinLength(6)
  password: string;
}

export class UpdateUser {
  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  @MinLength(6)
  new_password: string;
}

export class Token {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
