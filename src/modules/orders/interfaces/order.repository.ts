import type { UpdateResponse } from '../../../@types';
import type { FindOptionsWhere, Repository } from 'typeorm';
import type { UpdateOrderDto } from '../dtos';
import type { Order } from '../entities';
import type { User } from '../../users/entities';

interface CustomRepository {
  findAllBy(where: FindOptionsWhere<Order>): Promise<Order[]>;
  findById(userId: number, id: number): Promise<Order | null>;
  createOne(user: User): Promise<Order>;
  updateOne(order: Order, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse>;
  deleteOne(order: Order): Promise<void>;
}

type IOrderRepository = CustomRepository & Repository<Order>

export type { IOrderRepository };
