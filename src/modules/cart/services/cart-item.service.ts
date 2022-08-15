import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import type { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import type { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import type ICartItemService from './cart-item.service.abstract';
import type { CartItem } from '../entities';
import type { User } from '../../users/entities';
import type { Product } from '../../products/entities';
import ProductRepository from '../../products/repositories/product.repository';
import CartItemRepository from '../repositories/cart-item.repository';

@Injectable()
export class CartItemService implements ICartItemService {

  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly productRepository: ProductRepository,
  ) { }
  public async create(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem | void> {
    try {
      const product = await this.productRepository.findOneById(createCartItemDto.productId) as Product;

      const upsertResult = await this.cartItemRepository.addCartItem(user, product);

      console.log(upsertResult);

      const cartItemId = (upsertResult.identifiers[0] as ObjectLiteral).id as number;

      await this.cartItemRepository.increment(
        { id: cartItemId },
        'itemCount',
        createCartItemDto.itemCount,
      );

      return await this.checkItemCount(cartItemId);

    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }

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
