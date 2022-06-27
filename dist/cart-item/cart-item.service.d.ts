import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities';
export declare class CartItemService {
    private cartItemRepository;
    private productRepository;
    private userRepository;
    constructor(cartItemRepository: Repository<CartItem>, productRepository: Repository<Product>, userRepository: Repository<User>);
    create(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem>;
    findAll(user: User): Promise<CartItem[] | NotFoundException>;
    findOne(user: User, id: number): Promise<CartItem | NotFoundException>;
    remove(user: User, id: number): Promise<CartItem>;
    checkItemCount(id: number): Promise<CartItem>;
    getCartItem(options: FindOptionsWhere<CartItem>): Promise<CartItem>;
    getCartItems(options: FindOptionsWhere<CartItem>): Promise<CartItem[]>;
}
