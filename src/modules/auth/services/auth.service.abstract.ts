import type { LoginDto, RegisterDto } from '../dtos';

export default abstract class IAuthService {

  public abstract login(userDto: LoginDto): Promise<{ access_token: string }>;
  public abstract register(userDto: RegisterDto): Promise<{ access_token: string }>;
  public abstract signToken(id: number, email: string, password: string): Promise<{ access_token: string }>;

}
