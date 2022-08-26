import { IsJWT } from 'class-validator';

export class AuthResponseDto {

  @IsJWT()
  public access_token!: string;

}
