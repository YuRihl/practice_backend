import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../photos/entities';
import { Category } from '../categories/entities';
import IProductService from './services/product.service.abstract';
import ProductRepository from './repositories/product.repository';
import { Product } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Photo, Category])],
  exports: [ProductRepository],
  controllers: [ProductController],
  providers: [{
    provide: IProductService,
    useClass: ProductService,
  }, ProductRepository],
})
export class ProductModule { }
