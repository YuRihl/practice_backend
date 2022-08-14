import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { Photo } from '../photos/entities';
import { Category } from '../categories/entities';
import IProductService from './services/product.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Photo, Category])],
  controllers: [ProductController],
  providers: [{
    provide: IProductService,
    useClass: ProductService,
  }],
})
export class ProductModule { }
