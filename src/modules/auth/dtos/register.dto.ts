import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../../../@framework/decorators';
import { LoginDto } from '.';

export class RegisterDto extends LoginDto {

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public secondName!: string;

  @IsEnum(Role)
  public role!: Role;

}
