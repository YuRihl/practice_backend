import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController as OrderController } from './controllers/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from './entities';
import IOrderService from './services/order.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [{
    provide: IOrderService,
    useClass: OrderService,
  }],
})
export class OrderModule { }
