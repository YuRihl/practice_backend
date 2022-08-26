import type { LoginDto, RegisterDto, AuthResponseDto } from '../dtos';

export default abstract class AuthService {

  public abstract login(userDto: LoginDto): Promise<AuthResponseDto>;
  public abstract register(userDto: RegisterDto): Promise<AuthResponseDto>;
  public abstract signToken(id: number, email: string): Promise<AuthResponseDto>;

}
