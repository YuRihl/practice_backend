import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(userDto: LoginDto) {
    const user: User = await this.userRepository.findOneBy({
      email: userDto.email,
    });

    if (!user) return new NotFoundException('The are not user with this email');

    const passwordCheck = await bcrypt.compare(userDto.password, user.password);

    if (!passwordCheck) {
      return new UnauthorizedException('Incorrect password');
    }

    return this.signToken(user.email, user.id);
  }

  async register(userDto: RegisterDto) {
    try {
      const hashSalt = await bcrypt.genSalt();

      const userToCreate = this.userRepository.create({
        email: userDto.email,
        password: await bcrypt.hash(userDto.password, hashSalt),
        firstName: userDto.firstName,
        secondName: userDto.secondName,
      });

      await this.userRepository.save(userToCreate);

      const createdUser: User = await this.userRepository.findOneBy({
        email: userDto.email,
      });

      console.log(createdUser);

      return this.signToken(createdUser.email, createdUser.id);
    } catch (error) {
      console.error(error);
    }
  }

  async signToken(email: string, id: number) {
    const payload = { email, sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30m',
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
    };
  }
}
