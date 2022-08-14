import type { UpdateUserDto } from '../dtos';
import type { User } from '../entities';

export default abstract class IUserService {

  public abstract findOne(user: User): User;
  public abstract findAll(): Promise<User[]>;
  public abstract update(user: User, updateUserDto: UpdateUserDto): Promise<User>;
  public abstract remove(user: User): Promise<{ message: string }>;

}
