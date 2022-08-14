import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemService } from './services/cart-item.service';
import { CartItem } from './entities';
import { Product } from '../products/entities';
import { User } from '../users/entities';
import ICartItemService from './services/cart-item.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, User])],
  controllers: [CartItemController],
  providers: [{
    provide: ICartItemService,
    useClass: CartItemService,
  }],
})
export class CartItemModule { }
