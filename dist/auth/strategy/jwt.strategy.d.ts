import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { PayloadDto } from '../dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(payload: PayloadDto): Promise<ReturnUserDto>;
}
export {};
