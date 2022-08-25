import { Module } from '@nestjs/common';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemServiceImpl } from './services/cart-item.service';
import CartItemService from './services/cart-item.service.abstract';
import { CartItemRepository, CartItemRepositoryFactory } from './repositories/cart-item.repository';
import { ProductModule } from '../products/product.module';

const cartItemService = { provide: CartItemService, useClass: CartItemServiceImpl };

const cartItemRepository = {
  provide: CartItemRepository,
  useFactory: CartItemRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [ProductModule],
  controllers: [CartItemController],
  providers: [cartItemService, cartItemRepository],
})
export class CartItemModule { }
