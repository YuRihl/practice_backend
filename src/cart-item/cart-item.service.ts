import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(user: User, createCartItemDto: CreateCartItemDto) {
    const product = await this.productRepository.findOneBy({
      id: createCartItemDto.productId,
    });

    const upsertResult = await this.cartItemRepository.upsert(
      {
        user,
        product,
      },
      { conflictPaths: ['product'] },
    );

    await this.cartItemRepository.increment(
      { id: upsertResult.identifiers[0].id },
      'itemCount',
      createCartItemDto.itemCount,
    );

    return await this.checkItemCount(upsertResult.identifiers[0].id);
  }

  async findAll(user: User) {
    const cartItems = await this.getCartItems({ user: { id: user.id } });

    if (!cartItems) return new NotFoundException();

    return cartItems;
  }

  async findOne(user: User, id: number) {
    const cartItem = await this.getCartItem({ user: { id: user.id }, id });

    if (!cartItem) return new NotFoundException();

    return cartItem;
  }

  async remove(user: User, id: number) {
    const cartItem = await this.getCartItem({ user: { id: user.id }, id });

    const deletedCartItem = await this.cartItemRepository.remove(cartItem);

    return deletedCartItem;
  }

  async checkItemCount(id: number) {
    const cartItem = await this.getCartItem({ id });

    if (cartItem.itemCount <= 0) {
      const removedCartItem = await this.cartItemRepository.remove(cartItem);
      return removedCartItem;
    }

    return this.getCartItem({ id: cartItem.id });
  }

  async getCartItem(options: FindOptionsWhere<CartItem>) {
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

    return returnedCartItem;
  }

  async getCartItems(options: FindOptionsWhere<CartItem>) {
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
