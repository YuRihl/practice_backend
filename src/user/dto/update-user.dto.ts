import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ minimum: 5, maximum: 50 })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ minimum: 6, maximum: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  secondName: string;
}
