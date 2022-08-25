import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { OrderServiceImpl } from './services/order.service';
import { OrderController as OrderController } from './controllers/order.controller';
import OrderService from './services/order.service.abstract';
import {
  OrderItemRepository, OrderItemRepositoryFactory,
  OrderRepository, OrderRepositoryFactory,
} from './repositories';
import { ProductModule } from '../products/product.module';

const orderService: Provider = { provide: OrderService, useClass: OrderServiceImpl };

const orderRepository: Provider = {
  provide: OrderRepository,
  useFactory: OrderRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

const orderItemRepository: Provider = {
  provide: OrderItemRepository,
  useFactory: OrderItemRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [ProductModule],
  controllers: [OrderController],
  providers: [orderService, orderRepository, orderItemRepository],
})
export class OrderModule { }
