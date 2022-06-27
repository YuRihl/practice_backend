import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { CartItem } from 'src/cart-item/entities';
export declare class UserService {
    private userRepository;
    private cartRepository;
    constructor(userRepository: Repository<User>, cartRepository: Repository<CartItem>);
    findOne(user: User): User;
    update(user: User, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        firstName: string;
        secondName: string;
    }>;
    remove(user: User): Promise<{
        email: string;
        firstName: string;
        secondName: string;
    }>;
}
