import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductInfo, Category } from './entities';
import { Photo } from 'src/photo/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductInfo, Photo])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
