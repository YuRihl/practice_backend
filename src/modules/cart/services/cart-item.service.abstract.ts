import type { FindOptionsWhere } from 'typeorm';
import type { CreateCartItemDto } from '../dtos';
import type { User } from '../../users/entities';
import type { CartItem } from '../entities';

export default abstract class ICartItemService {

  public abstract create(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem>;
  public abstract findAll(user: User): Promise<CartItem[]>;
  public abstract findOne(user: User, id: number): Promise<CartItem>;
  public abstract remove(user: User, id: number): Promise<CartItem>;
  public abstract checkItemCount(id: number): Promise<CartItem>;
  public abstract getCartItem(options: FindOptionsWhere<CartItem>): Promise<CartItem>;
  public abstract getCartItems(options: FindOptionsWhere<CartItem>): Promise<CartItem[]>;

}
