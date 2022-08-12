import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { Photo } from 'src/modules/photos/entities';
import { Category } from 'src/modules/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Photo, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
