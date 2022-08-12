import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { CartItemController } from './controllers/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities';
import { Product } from 'src/modules/products/entities';
import { User } from 'src/modules/users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, User])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule { }
