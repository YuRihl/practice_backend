import type { Category } from '../../categories/entities';
import type { DataSource, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import type { Product } from '../entities';
import { ProductCategory } from '../entities';
import { InternalServerErrorException } from '@nestjs/common';
import type { IProductCategoryRepository } from '../interfaces';

const selectOptions: FindOptionsSelect<ProductCategory> = {
  id: true,
  product: {
    id: true,
    name: true,
    price: true,
    availableCount: true,
    soldCount: true,
    description: true,
    content: true,
  },
  category: {
    id: true,
    name: true,
  },
};

const relationOptions: FindOptionsRelations<ProductCategory> = {
  category: true,
  product: true,
};

export const ProductCategoryRepository = Symbol('PRODUCT_CATEGORY_REPOSITORY');

export const ProductCategoryRepositoryFactory =
  (dataSource: DataSource): IProductCategoryRepository =>
    dataSource.getRepository(ProductCategory).extend({
      async findAllBy(where: FindOptionsWhere<ProductCategory>): Promise<ProductCategory[]> {
        try {
          return await this.find({
            select: selectOptions,
            relations: relationOptions,
            where,
          });
        } catch (error) {
          throw new InternalServerErrorException((error as Error).message);
        }
      },

      async findById(id: number): Promise<ProductCategory | null> {
        try {
          return await this.findOne({
            select: selectOptions,
            relations: relationOptions,
            where: { id },
          });
        } catch (error) {
          throw new InternalServerErrorException((error as Error).message);
        }
      },

      async createOne(product: Product, category: Category): Promise<ProductCategory> {
        try {
          const productCategory = await this.create({ product, category });

          const newProductCategory = await this.save(productCategory);

          return newProductCategory;
        } catch (error) {
          throw new InternalServerErrorException((error as Error).message);
        }
      },

      async deleteAll(productCategories: ProductCategory[]): Promise<void> {
        try {
          await this.remove(productCategories);
        } catch (error) {
          throw new InternalServerErrorException((error as Error).message);
        }
      },
    });

