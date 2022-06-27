import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { PayloadDto } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: PayloadDto) {
    const user: ReturnUserDto = await this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        firstName: true,
        secondName: true,
      },
      where: {
        id: payload.sub,
        email: payload.email,
      },
    });

    return user;
  }
}
