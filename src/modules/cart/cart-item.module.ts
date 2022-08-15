import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemService } from './services/cart-item.service';
import { User } from '../users/entities';
import ICartItemService from './services/cart-item.service.abstract';
import CartItemRepository from './repositories/cart-item.repository';
import { ProductModule } from '../products/product.module';
import { CartItem } from './entities';
import { Product } from '../products/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User, Product]), ProductModule],
  controllers: [CartItemController],
  providers: [{
    provide: ICartItemService,
    useClass: CartItemService,
  }, CartItemRepository],
})
export class CartItemModule { }
