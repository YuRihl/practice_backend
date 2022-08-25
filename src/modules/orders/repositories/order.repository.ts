import type { UpdateResponse } from '../../../@types';
import type { DataSource, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import type { UpdateOrderDto } from '../dtos';
import { Order } from '../entities';
import type { IOrderRepository } from '../interfaces';
import { InternalServerErrorException } from '@nestjs/common';
import type { User } from '../../users/entities';

const selectOptions: FindOptionsSelect<Order> = {
  items: {
    product: {
      id: true,
      name: true,
    },
    id: true,
    orderCount: true,
    orderPrice: true,
  },
  user: {
    id: true,
    firstName: true,
    secondName: true,
  },
};

const relationOptions: FindOptionsRelations<Order> = {
  user: true,
  items: {
    product: true,
  },
};

export const OrderRepository = Symbol('ORDER_REPOSITORY');

export const OrderRepositoryFactory = (dataSource: DataSource): IOrderRepository =>
  dataSource.getRepository(Order).extend({
    async findAllBy(where: FindOptionsWhere<Order>): Promise<Order[]> {
      try {
        return await this.find({
          select: selectOptions,
          relations: relationOptions,
          where,
          order: {
            id: 'asc',
          },
        });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async findById(userId: number, id: number): Promise<Order | null> {
      try {
        return await this.findOne({
          select: selectOptions,
          relations: relationOptions,
          where: { id, user: { id: userId } },
        });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async createOne(user: User): Promise<Order> {
      try {
        const order = await this.create({ user });

        return await this.save(order);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async updateOne(order: Order, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse> {
      try {
        const mergedOrder = await this.merge(order, updateOrderDto);

        const { id: updatedId, updatedAt } = await this.save(mergedOrder);

        return { message: 'Order was updated successfully', id: updatedId, updatedAt: updatedAt.toISOString() };
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async deleteOne(order: Order): Promise<void> {
      try {
        await this.remove(order);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },
  });
