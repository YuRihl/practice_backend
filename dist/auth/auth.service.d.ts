import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthService {
    private configService;
    private jwtService;
    private userRepository;
    constructor(configService: ConfigService, jwtService: JwtService, userRepository: Repository<User>);
    login(userDto: LoginDto): Promise<NotFoundException | UnauthorizedException | {
        access_token: string;
    }>;
    register(userDto: RegisterDto): Promise<{
        access_token: string;
    } | BadRequestException>;
    signToken(email: string, id: number): Promise<{
        access_token: string;
    }>;
}
