import type { User } from '../../users/entities';
import type { Order, OrderItem } from '../entities';
import type { OrderStatus } from '../entities/order-status.enum';

export class OrderDto {

  public id!: number;
  public status!: OrderStatus;
  public createdAt!: Date;
  public updatedAt!: Date;
  public user!: User;
  public items!: OrderItem[];

  public static fromEntity(order: Order): OrderDto {
    const orderDto = new OrderDto();
    orderDto.id = order.id;
    orderDto.status = order.status;
    orderDto.createdAt = order.createdAt;
    orderDto.updatedAt = order.updatedAt;
    orderDto.user = order.user;
    orderDto.items = order.items;

    return orderDto;
  }

  public static fromEntities(orders: Order[]): OrderDto[] {
    const orderDtos: OrderDto[] = [];

    orders.forEach(order => orderDtos.push(this.fromEntity(order)));
    return orderDtos;
  }

}
