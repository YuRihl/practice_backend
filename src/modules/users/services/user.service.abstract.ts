import type { RegisterDto } from 'src/modules/auth/dtos';
import type { UpdateResponse } from '../../../@types';
import type { UpdateUserDto } from '../dtos';
import type { User } from '../entities';

export default abstract class UserService {

  public abstract findAllUsers(): Promise<User[]>;
  public abstract findOneUser(idOrEmail: number | string): Promise<User>;
  public abstract createOneUser(registerDto: RegisterDto): Promise<User>;
  public abstract updateOneUser(user: User, updateUserDto: UpdateUserDto): Promise<UpdateResponse>;
  public abstract deleteOneUser(user: User): Promise<void>;

}
