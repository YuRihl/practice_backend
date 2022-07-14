import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
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
  async create(createCartItemDto: CreateCartItemDto) {
    const user = await this.userRepository.findOneBy({
      id: createCartItemDto.userId,
    });

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

  async findAll() {
    const cartItems = await this.getCartItems();

    if (!cartItems) return new NotFoundException();

    return cartItems;
  }

  async findOne(id: number) {
    const cartItem = await this.getCartItem(id);

    if (!cartItem) return new NotFoundException();

    return cartItem;
  }

  async getCartItem(id: number) {
    const returnedCartItem = await this.cartItemRepository.findOne({
      select: {
        product: {
          name: true,
          price: true,
        },
        itemCount: true,
        id: true,
      },
      relations: {
        product: true,
      },
      where: {
        id: id,
      },
    });

    return returnedCartItem;
  }

  async getCartItems() {
    const returnedCartItem = await this.cartItemRepository.find({
      select: {
        product: {
          name: true,
          price: true,
        },
        itemCount: true,
        id: true,
      },
      relations: {
        product: true,
      },
    });

    return returnedCartItem;
  }

  async checkItemCount(id: number) {
    const cartItem = await this.cartItemRepository.findOneBy({ id });

    if (cartItem.itemCount <= 0) {
      this.cartItemRepository.update({ id: cartItem.id }, { itemCount: 0 });
    }

    return this.getCartItem(cartItem.id);
  }

  async remove(id: number) {
    const cartItem = await this.getCartItem(id);

    const deletedCartItem = await this.cartItemRepository.remove(cartItem);

    return deletedCartItem;
  }
}
