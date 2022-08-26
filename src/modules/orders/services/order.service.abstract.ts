import type { UpdateResponse } from 'src/@types';
import type { User } from '../../users/entities';
import type { CreateOrderDto, UpdateOrderDto } from '../dtos';
import type { Order, OrderStatus } from '../entities';

export default abstract class OrderService {

  public abstract findAllOrders(userId: number, status: OrderStatus): Promise<Order[]>;
  public abstract findOneOrder(id: number, userId: number): Promise<Order>;
  public abstract createOneOrder(user: User, createOrderDtos: CreateOrderDto[]): Promise<Order>;
  public abstract updateOneOrder(id: number, userId: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse>;
  public abstract deleteOneOrder(id: number, userId: number): Promise<void>;

}
