import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
