import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProductService from '../../products/services/product.service.abstract';
import type { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import type { User } from '../../users/entities';
import type { CreateCartItemDto } from '../dtos';
import type { CartItem } from '../entities';
import { ICartItemRepository } from '../interfaces';
import { CartItemRepository } from '../repositories/cart-item.repository';
import type CartItemService from './cart-item.service.abstract';

@Injectable()
export class CartItemServiceImpl implements CartItemService {

  private _selectOptions: FindOptionsSelect<CartItem> = {
    id: true,
    itemCount: true,
    product: {
      id: true,
      name: true,
      price: true,
    },
  };

  private _relationOptions: FindOptionsRelations<CartItem> = {
    product: true,
  };

  constructor(
    @Inject(CartItemRepository) private readonly cartItemRepository: ICartItemRepository,
    @Inject(ProductService) private readonly productService: ProductService,
  ) { }

  public async findAllCartItems(userId: number): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      select: this._selectOptions,
      relations: this._relationOptions,
      where: { user: { id: userId } },
    });
  }

  public async findOneCartItem(id: number, userId: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      select: this._selectOptions,
      relations: this._relationOptions,
      where: { id, user: { id: userId } },
    });
    if (!cartItem) throw new NotFoundException(`Cart item with ID ${id} not found`);

    return cartItem;
  }

  public async createOneCartItem(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem | void> {
    const product = await this.productService.findOneProduct(createCartItemDto.productId);

    const createResult = await this.cartItemRepository.createOne(user, product);
    await this.cartItemRepository.increment({ id: createResult.id }, 'itemCount', createCartItemDto.itemCount);

    const cartItem = await this.findOneCartItem(createResult.id, user.id);

    return await this.checkItemCount(cartItem);
  }

  public async deleteOneCartItem(id: number, userId: number): Promise<void> {
    const cartItem = await this.findOneCartItem(id, userId);

    await this.cartItemRepository.remove(cartItem);

  }

  public async checkItemCount(cartItem: CartItem): Promise<CartItem | void> {
    if (cartItem.itemCount <= 0) {
      await this.cartItemRepository.remove(cartItem);
    }

    return cartItem;
  }

}
