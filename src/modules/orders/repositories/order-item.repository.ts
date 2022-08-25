import { InternalServerErrorException } from '@nestjs/common';
import type { DataSource, FindOptionsWhere } from 'typeorm';
import { OrderItem } from '../entities';
import type { CreateOrderItem, IOrderItemRepository } from '../interfaces';

export const OrderItemRepository = Symbol('ORDER_ITEM_REPOSITORY');

export const OrderItemRepositoryFactory = (dataSource: DataSource): IOrderItemRepository =>
  dataSource.getRepository(OrderItem).extend({
    async findAllBy(where: FindOptionsWhere<OrderItem>): Promise<OrderItem[]> {
      try {
        return await this.findBy(where);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async findOneById(id: number): Promise<OrderItem | null> {
      try {
        return await this.findOneById({ id });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async createOne(createOrderItem: CreateOrderItem): Promise<OrderItem> {
      try {
        const orderItem = await this.create(createOrderItem);

        return await this.save(orderItem);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async deleteOne(orderItem: OrderItem): Promise<void> {
      try {
        await this.remove(orderItem);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },
  });
