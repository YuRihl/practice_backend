import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import AuthService from './auth.service.abstract';
import type { LoginDto, RegisterDto } from '../dtos';
import UserService from 'src/modules/users/services/user.service.abstract';

@Injectable()
export default class AuthServiceImpl extends AuthService {

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
  ) { super(); }

  public async login(userDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOneUser(userDto.email);

      const passwordCheck = await bcrypt.compare(userDto.password, user.password);
      if (!passwordCheck) throw new UnauthorizedException('Incorrect password');

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async register(userDto: RegisterDto): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.createOneUser(userDto);

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  public async signToken(id: number, email: string): Promise<{ access_token: string }> {
    try {
      const payload = { sub: id, email };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

}
