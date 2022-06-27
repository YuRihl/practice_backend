import { Injectable } from '@nestjs/common';
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

    const newCartItem = await this.cartItemRepository.create({
      user,
      product,
      itemCount: createCartItemDto.itemCount,
    });

    await this.cartItemRepository.save(newCartItem);

    const returnedCartItem = await this.cartItemRepository.findOne({
      select: {
        product: {
          name: true,
          price: true,
        },
        itemCount: true,
      },
      relations: {
        product: true,
      },
    });

    return returnedCartItem;
  }

  findAll() {
    return `This action returns all cartItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
