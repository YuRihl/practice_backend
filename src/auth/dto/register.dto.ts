import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {

  @ApiProperty({ minimum: 2, maximum: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public firstName!: string;

  @ApiProperty({ minimum: 2, maximum: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public secondName!: string;

}
