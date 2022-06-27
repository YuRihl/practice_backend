import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<import("@nestjs/common").NotFoundException | import("@nestjs/common").UnauthorizedException | {
        access_token: string;
    }>;
    register(body: RegisterDto): Promise<{
        access_token: string;
    } | import("@nestjs/common").BadRequestException>;
}
