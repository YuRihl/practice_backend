import { Injectable } from '@nestjs/common';
import type IOrderService from './order.service.abstract';
// import type { CreateOrderDto } from './dto/create-order.dto';
// import type { UpdateOrderDto } from './dto/update-order.dto';
// import { Order } from './entities/order.entity';

@Injectable()
export class OrderService implements IOrderService {

}
