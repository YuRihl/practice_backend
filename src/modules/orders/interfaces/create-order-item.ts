import type { Product } from 'src/modules/products/entities';
import type { Order } from '../entities';

interface CreateOrderItem {
  orderCount: number;
  orderPrice: number;
  product: Product;
  order: Order;
}

export type { CreateOrderItem };
