import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ReturnUserDto } from './return-user.dto';
export class UpdateUserDto extends ReturnUserDto {
  @ApiProperty({ minimum: 6, maximum: 100 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password?: string;
}
