import { IsEmail, IsInt, IsPositive, MaxLength } from 'class-validator';

export class PayloadDto {
  @IsPositive()
  @IsInt()
  sub: number;

  @IsEmail()
  @MaxLength(50)
  email: string;
}
