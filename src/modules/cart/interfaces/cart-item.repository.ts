import type { FindOptionsWhere, Repository } from 'typeorm';
import type { Product } from '../../products/entities';
import type { User } from '../../users/entities';
import type { CartItem } from '../entities';

interface CustomRepository {
  findAllBy(where: FindOptionsWhere<CartItem>): Promise<CartItem[]>;
  findById(userId: number, id: number): Promise<CartItem | null>;
  createOne(user: User, product: Product): Promise<CartItem>;
  deleteOne(cartItem: CartItem): Promise<void>;
  incrementOne(userId: number, id: number, count: number): Promise<CartItem>;
}

type ICartItemRepository = CustomRepository & Repository<CartItem>;

export type { ICartItemRepository };
