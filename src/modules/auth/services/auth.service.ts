import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import type IAuthService from './auth.service.abstract';
import type { LoginDto, RegisterDto } from '../dtos';
import { User } from '../../users/entities';
import type { DatabaseError } from 'pg-protocol';

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  public async login(userDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({
      email: userDto.email,
    });

    if (!user) throw new NotFoundException('There is no any user with this email');

    const passwordCheck = await bcrypt.compare(userDto.password, user.password);

    if (!passwordCheck) throw new UnauthorizedException('Incorrect password');

    return this.signToken(user.id, user.email);
  }

  public async register(userDto: RegisterDto): Promise<{ access_token: string }> {
    try {
      const hashSalt = await bcrypt.genSalt();

      const userToCreate = this.userRepository.create({
        email: userDto.email,
        password: await bcrypt.hash(userDto.password, hashSalt),
        firstName: userDto.firstName,
        secondName: userDto.secondName,
      });

      await this.userRepository.save(userToCreate);

      const createdUser = await this.userRepository.findOneBy({
        email: userDto.email,
      }) as User;

      return this.signToken(createdUser.id, createdUser.email);
    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error.driverError as DatabaseError).code === '23505') {
          throw new UnprocessableEntityException('This email already exists!');
        }
      }
      return { access_token: (error as object).constructor.name };
    }
  }

  public async signToken(id: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: id, email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '500m',
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
    };
  }

}
