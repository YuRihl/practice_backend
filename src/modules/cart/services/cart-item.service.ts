import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import type { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import type CartItemService from './cart-item.service.abstract';
import type { CartItem } from '../entities';
import type { User } from '../../users/entities';
import { CartItemRepository } from '../repositories/cart-item.repository';
import { ICartItemRepository } from '../interfaces';
import ProductService from 'src/modules/products/services/product.service.abstract';

@Injectable()
export class CartItemServiceImpl implements CartItemService {

  constructor(
    @Inject(CartItemRepository) private readonly cartItemRepository: ICartItemRepository,
    @Inject(ProductService) private readonly productService: ProductService,
  ) { }

  public async findAllCartItems(user: User): Promise<CartItem[]> {
    try {
      return await this.cartItemRepository.findAllBy({ user: { id: user.id } });
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async findOneCartItem(id: number): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findOneById(id);
      if (!cartItem) throw new NotFoundException('Cart item with given ID was not found');

      return cartItem;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createOneCartItem(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem | void> {
    try {
      const product = await this.productService.findOneProduct(createCartItemDto.productId);

      const createResult = await this.cartItemRepository.createOne(user, product);

      const cartItem = await this.cartItemRepository.incrementOne(createResult.id, createCartItemDto.itemCount);

      return await this.checkItemCount(cartItem);

    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }

  }

  public async deleteOneCartItem(id: number): Promise<void> {
    try {
      const cartItem = await this.cartItemRepository.findOneById(id);
      if (!cartItem) throw new NotFoundException('Cart item to delete was not found');

      await this.cartItemRepository.remove(cartItem);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async checkItemCount(cartItem: CartItem): Promise<CartItem | void> {
    try {
      if (cartItem.itemCount <= 0) {
        await this.cartItemRepository.remove(cartItem);
      }

      return cartItem;
    } catch (error) {

    }
  }

}
