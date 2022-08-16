import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import IProductService from './services/product.service.abstract';
import ProductRepository from './repositories/product.repository';
import { Product, ProductCategory } from './entities';
import { CategoryModule } from '../categories/category.module';
import ProductCategoryRepository from './repositories/product-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory]), CategoryModule],
  exports: [ProductRepository],
  controllers: [ProductController],
  providers: [{
    provide: IProductService,
    useClass: ProductService,
  }, ProductRepository, ProductCategoryRepository],
})
export class ProductModule { }
