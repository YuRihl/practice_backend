import type { DataSource } from 'typeorm';
import type { UpdateResponse } from '../../../@types';
import type { User } from '../../users/entities';
import type { UpdateOrderDto } from '../dtos';
import { Order } from '../entities';
import type { IOrderRepository } from '../interfaces';

export const OrderRepository = Symbol('ORDER_REPOSITORY');

export const OrderRepositoryFactory = (dataSource: DataSource): IOrderRepository =>
  dataSource.getRepository(Order).extend({
    async createOne(user: User): Promise<Order> {
      const order = await this.create({ user });

      return await this.save(order);
    },

    async updateOne(order: Order, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse> {
      const mergedOrder = await this.merge(order, updateOrderDto);

      const { id: updatedId, updatedAt } = await this.save(mergedOrder);

      return { message: 'Order was updated successfully', id: updatedId, updatedAt: updatedAt?.toISOString() };
    },
  });
