import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RegisterDto } from '../dtos';
import { LoginDto } from '../dtos/login.dto';
import IAuthService from '../services/auth.service.abstract';

@Controller()
export class AuthController {

  constructor(private readonly authService: IAuthService) { }

  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  public async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @ApiCreatedResponse()
  @Post('auth/register')
  public async register(@Body() body: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(body);
  }

}
