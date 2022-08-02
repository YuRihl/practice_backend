import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @ApiCreatedResponse({
    description: 'The user was logged in successfully',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  public async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @ApiCreatedResponse({
    description: 'The user was created successfully',
    type: User,
  })
  @Post('auth/register')
  public async register(@Body() body: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(body);
  }

}
