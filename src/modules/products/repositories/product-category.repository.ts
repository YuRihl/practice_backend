import type { Category } from '../../categories/entities';
import type { DataSource } from 'typeorm';
import type { Product } from '../entities';
import { ProductCategory } from '../entities';
import { InternalServerErrorException } from '@nestjs/common';
import type { IProductCategoryRepository } from '../interfaces';

export const ProductCategoryRepository = Symbol('PRODUCT_CATEGORY_REPOSITORY');
export const ProductCategoryRepositoryFactory =
  (dataSource: DataSource): IProductCategoryRepository =>
    dataSource.getRepository(ProductCategory).extend({
      async createOne(product: Product, category: Category): Promise<ProductCategory> {
        try {
          const productCategory = await this.create({ product, category });

          const newProductCategory = await this.save(productCategory);

          return newProductCategory;
        } catch (error) {
          throw new InternalServerErrorException((error as Error).message);
        }
      },
    });

