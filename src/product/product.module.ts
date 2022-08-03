import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductInfo } from './entities';
import { Photo } from 'src/photo/entities';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductInfo, Photo, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
