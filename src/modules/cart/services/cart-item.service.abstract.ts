import type { User } from 'src/modules/users/entities';
import type { FindOptionsWhere } from 'typeorm';
import type { CreateCartItemDto } from '../dtos';
import type { CartItem } from '../entities';

interface ICartItemService {
    create(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem>;
    findAll(user: User): Promise<CartItem[]>;
    findOne(user: User, id: number): Promise<CartItem>;
    remove(user: User, id: number): Promise<CartItem>;
    checkItemCount(id: number): Promise<CartItem>;
    getCartItem(options: FindOptionsWhere<CartItem>): Promise<CartItem>;
    getCartItems(options: FindOptionsWhere<CartItem>): Promise<CartItem[]>;
}

export default ICartItemService;
