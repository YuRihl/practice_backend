import { InternalServerErrorException } from '@nestjs/common';
import type { Product } from '../../products/entities';
import type { User } from '../../users/entities';
import type { DataSource, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { CartItem } from '../entities';
import type { ICartItemRepository } from '../interfaces';

const selectOptions: FindOptionsSelect<CartItem> = {
  product: {
    id: true,
    name: true,
    price: true,
  },
  itemCount: true,
  id: true,
};

const relationOptions: FindOptionsRelations<CartItem> = {
  product: true,
};

export const CartItemRepository = Symbol('CART_ITEM_REPOSITORY');

export const CartItemRepositoryFactory =
  (dataSource: DataSource): ICartItemRepository => dataSource.getRepository(CartItem).extend({
    async findAllBy(where: FindOptionsWhere<CartItem>): Promise<CartItem[]> {
      try {
        return await this.find({
          select: selectOptions,
          relations: relationOptions,
          where,
        });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async findById(userId: number, id: number): Promise<CartItem | null> {
      try {
        return await this.findOne({
          select: selectOptions,
          relations: relationOptions,
          where: { id, user: { id: userId } },
        });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async createOne(user: User, product: Product): Promise<CartItem> {
      try {
        const cartItem = await this.findOne({ where: { user: { id: user.id }, product: { id: product.id } } });

        if (!cartItem) {
          const newCartItem = await this.create({ user, product });
          return await this.save(newCartItem);
        }

        return cartItem;
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async deleteOne(cartItem: CartItem): Promise<void> {
      try {
        await this.remove(cartItem);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async incrementOne(userId: number, id: number, count: number): Promise<CartItem> {
      try {
        await this.increment({ id }, 'itemCount', count);

        return await this.findById(userId, id) as CartItem;
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },
  });
