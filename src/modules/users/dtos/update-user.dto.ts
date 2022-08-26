import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  public email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  public password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public secondName?: string;

}
