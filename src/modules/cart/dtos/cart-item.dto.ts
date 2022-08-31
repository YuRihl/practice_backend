import type { Product } from '../../products/entities';
import type { CartItem } from '../entities';

export class CartItemDto {

  public id!: number;
  public itemCount!: number;
  public product!: Product;

  public static fromEntity(cartItem: CartItem): CartItemDto {
    const cartItemDto = new CartItemDto();
    cartItemDto.id = cartItem.id;
    cartItemDto.itemCount = cartItem.itemCount;
    cartItemDto.product = cartItem.product;

    return cartItemDto;
  }

  public static fromEntities(cartItems: CartItem[]): CartItemDto[] {
    const cartItemDtos: CartItemDto[] = [];

    cartItems.forEach(cartItem => cartItemDtos.push(this.fromEntity(cartItem)));
    return cartItemDtos;
  }

}
