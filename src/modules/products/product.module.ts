import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import ProductService from './services/product.service.abstract';
import { ProductServiceImpl } from './services/product.service';
import { Product, ProductCategory } from './entities';
import { ProductRepository, ProductRepositoryFactory } from './repositories/product.repository';
import { ProductCategoryRepository, ProductCategoryRepositoryFactory }
  from './repositories/product-category.repository';

const productService = { provide: ProductService, useClass: ProductServiceImpl };

const productCategoryRepository = {
  provide: ProductCategoryRepository,
  useFactory: ProductCategoryRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

const productRepository = {
  provide: ProductRepository,
  useFactory: ProductRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory])],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [productService, productRepository, productCategoryRepository],
})
export class ProductModule { }
