import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities';
import { Repository } from 'typeorm';
import type { LoginDto, RegisterDto } from '../dtos';
import * as bcrypt from 'bcrypt';
import type IAuthService from './auth.service.abstract';

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

    if (!user) throw new NotFoundException('The are not user with this email');

    const passwordCheck = await bcrypt.compare(userDto.password, user.password);

    if (!passwordCheck) throw new UnauthorizedException('Incorrect password');

    return await this.signToken(user.email, user.id);
  }

  public async register(userDto: RegisterDto): Promise<{ access_token: string }> {
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

    return await this.signToken(createdUser.email, createdUser.id);
  }

  public async signToken(email: string, id: number): Promise<{ access_token: string }> {
    const payload = { email, sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '500m',
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
    };
  }

}
