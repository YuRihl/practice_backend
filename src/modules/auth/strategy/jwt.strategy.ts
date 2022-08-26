import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { PayloadDto } from '../dtos';
import type { User } from '../../users/entities';
import UserService from 'src/modules/users/services/user.service.abstract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    configService: ConfigService,
    @Inject(UserService) private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  public async validate(payload: PayloadDto): Promise<User> {
    return await this.userService.findOneUser(payload.sub);
  }

}
