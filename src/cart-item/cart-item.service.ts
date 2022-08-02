import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities';
import type { User } from 'src/user/entities';
import type { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { Repository } from 'typeorm';
import type { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities';

@Injectable()
export class CartItemService {

  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  public async create(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const product = await this.productRepository.findOneBy({
      id: createCartItemDto.productId,
    }) as Product;

    const upsertResult = await this.cartItemRepository.upsert(
      {
        user,
        product,
      },
      { conflictPaths: ['product'] },
    );

    const cartItemId = (upsertResult.identifiers[0] as ObjectLiteral).id as number;

    await this.cartItemRepository.increment(
      { id: cartItemId },
      'itemCount',
      createCartItemDto.itemCount,
    );

    return await this.checkItemCount(cartItemId);
  }

  public async findAll(user: User): Promise<CartItem[]> {
    const cartItems = await this.getCartItems({ user: { id: user.id } });

    return cartItems;
  }

  public async findOne(user: User, id: number): Promise<CartItem> {
    const cartItem = await this.getCartItem({ user: { id: user.id }, id });

    if (!cartItem) throw new NotFoundException();

    return cartItem;
  }

  public async remove(user: User, id: number): Promise<CartItem> {
    const cartItem = await this.getCartItem({ user: { id: user.id }, id });

    if (!cartItem) throw new NotFoundException();

    const deletedCartItem = await this.cartItemRepository.remove(cartItem);

    return deletedCartItem;
  }

  public async checkItemCount(id: number): Promise<CartItem> {
    const cartItem = await this.getCartItem({ id });

    if (!cartItem) throw new NotFoundException();

    if (cartItem.itemCount <= 0) {
      const removedCartItem = await this.cartItemRepository.remove(cartItem);
      return removedCartItem;
    }

    return await this.getCartItem({ id: cartItem.id }) as CartItem;
  }

  public async getCartItem(options: FindOptionsWhere<CartItem>): Promise<CartItem> {
    const returnedCartItem = await this.cartItemRepository.findOne({
      select: {
        product: {
          id: true,
          name: true,
          price: true,
        },
        itemCount: true,
        id: true,
      },
      relations: {
        product: true,
      },
      where: options,
    });

    if (!returnedCartItem) throw new NotFoundException();

    return returnedCartItem;
  }

  public async getCartItems(options: FindOptionsWhere<CartItem>): Promise<CartItem[]> {
    const returnedCartItem = await this.cartItemRepository.find({
      select: {
        product: {
          id: true,
          name: true,
          price: true,
        },
        itemCount: true,
        id: true,
      },
      relations: {
        product: true,
      },
      where: options,
    });

    return returnedCartItem;
  }

}
