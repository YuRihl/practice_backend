import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import type { UpdateResponse } from 'src/@types';
import ProductService from 'src/modules/products/services/product.service.abstract';
import type { User } from 'src/modules/users/entities';
import type { CreateOrderDto, UpdateOrderDto } from '../dtos';
import type { OrderStatus, Order } from '../entities';
import { IOrderItemRepository, IOrderRepository } from '../interfaces';
import { OrderItemRepository, OrderRepository } from '../repositories';
import OrderService from './order.service.abstract';

@Injectable()
export class OrderServiceImpl extends OrderService {

  constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository,
    @Inject(OrderItemRepository) private readonly orderItemRepository: IOrderItemRepository,
    @Inject(ProductService) private readonly productService: ProductService) {
    super();
  }

  public async findAllOrders(user: User, status: OrderStatus): Promise<Order[]> {
    try {
      return await this.orderRepository.findAllBy({ user: { id: user.id }, status });
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async findOneOrder(user: User, id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findById(user.id, id);
      if (!order) throw new NotFoundException('Order with given ID was not found');

      return order;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createOneOrder(user: User, createOrderDtos: CreateOrderDto[]): Promise<Order> {
    try {
      const order = await this.orderRepository.createOne(user);

      for (const { productId, productCount } of createOrderDtos) {
        const product = await this.productService.findOneProduct(productId);
        await this.orderItemRepository.createOne(
          { orderCount: productCount, orderPrice: product.price, product, order });

      }

      const newOrder = await this.orderRepository.findById(user.id, order.id) as Order;

      return newOrder;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async updateOneOrder(user: User, id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse> {
    try {
      const order = await this.orderRepository.findById(user.id, id);
      if (!order) throw new NotFoundException('Order to update was not found');

      return await this.orderRepository.updateOne(order, updateOrderDto);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async deleteOneOrder(user: User, id: number): Promise<void> {
    try {
      const order = await this.orderRepository.findById(user.id, id);
      if (!order) throw new NotFoundException('Order to delete was not found');

      await this.orderRepository.deleteOne(order);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

}
