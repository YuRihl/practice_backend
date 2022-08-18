import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemServiceImpl } from './services/cart-item.service';
import { User } from '../users/entities';
import CartItemService from './services/cart-item.service.abstract';
import { CartItemRepository, CartItemRepositoryFactory } from './repositories/cart-item.repository';
import { CartItem } from './entities';

const cartItemService = { provide: CartItemService, useClass: CartItemServiceImpl };

const cartItemRepository = {
  provide: CartItemRepository,
  useFactory: CartItemRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User])],
  controllers: [CartItemController],
  providers: [cartItemService, cartItemRepository],
})
export class CartItemModule { }
