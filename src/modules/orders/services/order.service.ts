import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { FindOptionsRelations, FindOptionsSelect } from 'typeorm';
import { OrderService } from './order.service.abstract';
import { ProductService } from '../../products/services';
import type { User } from '../../users/entities';
import type { CreateOrderDto, UpdateOrderDto } from '../dtos';
import type { Order } from '../entities';
import { IOrderItemRepository, IOrderRepository } from '../interfaces';
import { OrderItemRepository, OrderRepository } from '../repositories';
import type { OrderStatus } from '../entities/order-status.enum';

@Injectable()
export class OrderServiceImpl extends OrderService {

  private _selectOptions: FindOptionsSelect<Order> = {
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

  private _relationOptions: FindOptionsRelations<Order> = {
    user: true,
    items: {
      product: true,
    },
  };

  constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository,
    @Inject(OrderItemRepository) private readonly orderItemRepository: IOrderItemRepository,
    @Inject(ProductService) private readonly productService: ProductService) {
    super();
  }

  public async findAllOrders(userId: number, status: OrderStatus): Promise<Order[]> {
    return await this.orderRepository.find({
      select: this._selectOptions,
      relations: this._relationOptions,
      where: { user: { id: userId }, status },
      order: {
        id: 'asc',
      },
    });
  }

  public async findOneOrder(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      select: this._selectOptions,
      relations: this._relationOptions,
      where: { id, user: { id: userId } },
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);

    return order;
  }

  public async createOneOrder(user: User, createOrderDtos: CreateOrderDto[]): Promise<Order> {
    const order = await this.orderRepository.createOne(user);

    for (const { productId, productCount } of createOrderDtos) {
      const product = await this.productService.findOneProduct(productId);
      await this.orderItemRepository.createOne(
        { orderCount: productCount, orderPrice: product.price, product, order });
    }

    return await this.findOneOrder(order.id, user.id);
  }

  public async updateOneOrder(id: number, userId: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse> {
    const order = await this.findOneOrder(id, userId);

    return await this.orderRepository.updateOne(order, updateOrderDto);
  }

  public async deleteOneOrder(id: number, userId: number): Promise<void> {
    const order = await this.findOneOrder(id, userId);

    await this.orderRepository.remove(order);
  }

}
