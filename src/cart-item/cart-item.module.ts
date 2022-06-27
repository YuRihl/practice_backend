import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, User])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
