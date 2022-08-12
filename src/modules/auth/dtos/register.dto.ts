import { IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public secondName!: string;

}
