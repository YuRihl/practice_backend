import type { UpdateResponse } from 'src/@types';
import type { User } from '../../users/entities';
import type { CreateOrderDto, UpdateOrderDto } from '../dtos';
import type { Order, OrderStatus } from '../entities';

export default abstract class OrderService {

  public abstract findAllOrders(user: User, status: OrderStatus): Promise<Order[]>;
  public abstract findOneOrder(user: User, id: number): Promise<Order>;
  public abstract createOneOrder(user: User, createOrderDtos: CreateOrderDto[]): Promise<Order>;
  public abstract updateOneOrder(user: User, id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResponse>;
  public abstract deleteOneOrder(user: User, id: number): Promise<void>;

}
