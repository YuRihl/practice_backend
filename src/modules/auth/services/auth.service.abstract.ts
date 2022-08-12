import type { LoginDto, RegisterDto } from '../dtos';

interface IAuthService {
    login(userDto: LoginDto): Promise<{ access_token: string }>;
    register(userDto: RegisterDto): Promise<{ access_token: string }>;
    signToken(email: string, id: number): Promise<{ access_token: string }>;
}

export default IAuthService;
