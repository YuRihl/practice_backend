import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthGuard } from './user-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    return body;
  }
}
