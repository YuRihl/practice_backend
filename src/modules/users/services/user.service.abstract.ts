import type { ReturnUserDto, UpdateUserDto } from '../dtos';
import type { User } from '../entities';

interface IUserService {
    findOne(user: User): Promise<ReturnUserDto>;
    findAll(): Promise<User[]>;
    update(user: User, updateUserDto: UpdateUserDto): Promise<ReturnUserDto>;
    remove(user: User): Promise<{ message: string }>;
}

export default IUserService;
