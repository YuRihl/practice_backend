import type { DataSource } from 'typeorm';
import type { UpdateResponse } from '../../../@types';
import type { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product } from '../entities';
import type { IProductRepository } from '../interfaces';

export const ProductRepository = Symbol('PRODUCT_REPOSITORY');

export const ProductRepositoryFactory =
  (dataSource: DataSource): IProductRepository => dataSource.getRepository(Product).extend({
    async createOne(createProductDto: Omit<CreateProductDto, 'categories'>): Promise<Product> {

      const product = await this.create(createProductDto);

      const newProduct = await this.save(product);

      return newProduct;
    },

    async updateOne(product: Product, updateProductDto: Omit<UpdateProductDto, 'categories'>): Promise<UpdateResponse> {
      const newProduct = await this.merge(product, updateProductDto);

      const { id, updatedAt } = await this.save(newProduct);

      return {
        message: 'Product was updated successfully',
        id, updatedAt: updatedAt?.toISOString(),
      };
    },
  });
