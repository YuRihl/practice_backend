import type { DataSource } from 'typeorm';
import { OrderItem } from '../entities';
import type { CreateOrderItem, IOrderItemRepository } from '../interfaces';

export const OrderItemRepository = Symbol('ORDER_ITEM_REPOSITORY');

export const OrderItemRepositoryFactory = (dataSource: DataSource): IOrderItemRepository =>
  dataSource.getRepository(OrderItem).extend({
    async createOne(createOrderItem: CreateOrderItem): Promise<OrderItem> {
      const orderItem = await this.create(createOrderItem);

      return await this.save(orderItem);
    },
  });
