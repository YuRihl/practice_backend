import type { FindOptionsWhere, Repository } from 'typeorm';
import type { OrderItem } from '../entities';
import type { CreateOrderItem } from './create-order-item';

interface CustomRepository {
  findAllBy(where: FindOptionsWhere<OrderItem>): Promise<OrderItem[]>;
  findOneById(id: number): Promise<OrderItem | null>;
  createOne(createOrderItem: CreateOrderItem): Promise<OrderItem>;
  deleteOne(orderItem: OrderItem): Promise<void>;
}

type IOrderItemRepository = CustomRepository & Repository<OrderItem>

export type { IOrderItemRepository };
