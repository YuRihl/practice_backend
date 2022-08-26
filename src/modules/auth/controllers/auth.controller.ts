import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { AuthResponseDto } from '../dtos';
import { RegisterDto } from '../dtos';
import { LoginDto } from '../dtos/login.dto';
import AuthService from '../services/auth.service.abstract';

@ApiTags('Authorization')
@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  public async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }

  @Post('auth/register')
  public async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }

}
