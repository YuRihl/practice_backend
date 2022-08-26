import type { Repository } from 'typeorm';
import type { OrderItem } from '../entities';
import type { CreateOrderItem } from './create-order-item';

interface CustomRepository {
  createOne(createOrderItem: CreateOrderItem): Promise<OrderItem>;
}

type IOrderItemRepository = CustomRepository & Repository<OrderItem>

export type { IOrderItemRepository };
