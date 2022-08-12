import { Injectable } from '@nestjs/common';
import type IOrderService from './order.service.abstract';
// import type { CreateOrderDto } from './dto/create-order.dto';
// import type { UpdateOrderDto } from './dto/update-order.dto';
// import { Order } from './entities/order.entity';

@Injectable()
export class OrderService implements IOrderService {

  // public async create(createOrderDto: CreateOrderDto): Promise<Order> {
  //   return await new Order();
  // }

  // public async findAll(): Promise<Order[]> {
  //   return await [];
  // }

  // public async findOne(id: number): Promise<Order> {
  //   return await `This action returns a #${id} order`;
  // }

  // public async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
  //   return await `This action updates a #${id} order`;
  // }

  // public async remove(id: number): Promise<Order> {
  //   return await `This action removes a #${id} order`;
  // }

}
