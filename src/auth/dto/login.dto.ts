import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ minimum: 5, maximum: 50 })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ minimum: 6, maximum: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
