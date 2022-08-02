import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class UpdateUserDto {

  @ApiProperty({ minimum: 5, maximum: 50 })
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  public email?: string;

  @ApiProperty({ minimum: 6, maximum: 100 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public password?: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public firstName?: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public secondName?: string;

}
