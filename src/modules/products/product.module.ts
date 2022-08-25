import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import ProductService from './services/product.service.abstract';
import { ProductServiceImpl } from './services/product.service';
import { ProductRepository, ProductRepositoryFactory } from './repositories/product.repository';
import { ProductCategoryRepository, ProductCategoryRepositoryFactory }
  from './repositories/product-category.repository';
import { CategoryModule } from '../categories/category.module';

const productService: Provider = { provide: ProductService, useClass: ProductServiceImpl };

const productCategoryRepository: Provider = {
  provide: ProductCategoryRepository,
  useFactory: ProductCategoryRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

const productRepository: Provider = {
  provide: ProductRepository,
  useFactory: ProductRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [CategoryModule],
  exports: [productService],
  controllers: [ProductController],
  providers: [productService, productRepository, productCategoryRepository],
})
export class ProductModule { }
