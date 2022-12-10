import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TodoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  createdOfDate: Date;
}
