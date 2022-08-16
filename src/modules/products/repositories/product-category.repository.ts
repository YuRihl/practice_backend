import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Category } from '../../categories/entities';
import { Repository } from 'typeorm';
import type { Product } from '../entities';
import { ProductCategory } from '../entities';

@Injectable()
export default class ProductCategoryRepository {

  constructor(@InjectRepository(ProductCategory)
  private readonly baseProductCategoryRepository: Repository<ProductCategory>) { }

  public async createOne(product: Product, category: Category): Promise<ProductCategory | void> {
    try {
      const productCategory = await this.baseProductCategoryRepository.create({ product, category });

      const newProductCategory = await this.baseProductCategoryRepository.save(productCategory);

      return newProductCategory;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

}
