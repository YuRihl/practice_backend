import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class LoginDto {

  @IsEmail()
  @MaxLength(50)
  public email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  public password!: string;

}
