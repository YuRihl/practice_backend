import type { Product } from '../../products/entities';
import type { Order } from '../entities';

export class CreateOrderItemDto {

  public orderCount!: number;
  public orderPrice!: number;
  public product!: Product;
  public order!: Order;

}
