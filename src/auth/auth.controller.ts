import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @ApiCreatedResponse({
    description: 'The user was created successfully',
    type: User,
  })
  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
