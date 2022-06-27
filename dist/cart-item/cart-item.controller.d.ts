import { User } from 'src/user/entities';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    create(user: User, createCartItemDto: CreateCartItemDto): Promise<import("./entities").CartItem>;
    findAll(user: User): Promise<import("./entities").CartItem[] | import("@nestjs/common").NotFoundException>;
    findOne(user: User, id: number): Promise<import("./entities").CartItem | import("@nestjs/common").NotFoundException>;
    remove(user: User, id: number): Promise<import("./entities").CartItem>;
}
