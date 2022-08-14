import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy';
import { User } from '../users/entities';
import IAuthService from './services/auth.service.abstract';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [{
    provide: IAuthService,
    useClass: AuthService,
  }, JwtStrategy],
})
export class AuthModule { }
