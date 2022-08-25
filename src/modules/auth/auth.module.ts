import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import AuthServiceImpl from './services/auth.service';
import { JwtStrategy } from './strategy';
import AuthService from './services/auth.service.abstract';
import { UserModule } from '../users/user.module';

const authService: Provider = { provide: AuthService, useClass: AuthServiceImpl };

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [authService, JwtStrategy],
})
export class AuthModule { }
