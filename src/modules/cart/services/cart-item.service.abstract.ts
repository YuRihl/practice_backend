import type { CreateCartItemDto } from '../dtos';
import type { User } from '../../users/entities';
import type { CartItem } from '../entities';

export default abstract class CartItemService {

  public abstract findAllCartItems(user: User): Promise<CartItem[]>;
  public abstract findOneCartItem(id: number): Promise<CartItem>;
  public abstract createOneCartItem(user: User, createCartItemDto: CreateCartItemDto): Promise<CartItem | void>;
  public abstract deleteOneCartItem(id: number): Promise<void>;
  public abstract checkItemCount(cartItem: CartItem): Promise<CartItem | void>;

}
