import type { Category } from 'src/modules/categories/entities';
import type { FindOptionsWhere, Repository } from 'typeorm';
import type { Product, ProductCategory } from '../entities';

interface CustomRepository {
  findAllBy(where: FindOptionsWhere<ProductCategory>): Promise<ProductCategory[]>;
  findById(id: number): Promise<ProductCategory | null>;
  createOne(product: Product, category: Category): Promise<ProductCategory>;
  deleteAll(productCategories: ProductCategory[]): Promise<void>;
}

type IProductCategoryRepository = CustomRepository & Repository<ProductCategory>;

export type { IProductCategoryRepository };
