import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class ReturnUserDto {
  @ApiProperty({ minimum: 5, maximum: 50 })
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName?: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  secondName?: string;
}
