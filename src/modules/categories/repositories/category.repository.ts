import type { DataSource, ObjectLiteral } from 'typeorm';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { Category } from '../entities';
import type { ICategoryRepository } from '../interfaces';

export const CategoryRepository = Symbol('CATEGORY_REPOSITORY');

export const CategoryRepositoryFactory =
  (dataSource: DataSource): ICategoryRepository => dataSource.getRepository(Category).extend({
    async createOne(createCategoryDto: CreateCategoryDto): Promise<Category> {
      const { identifiers } = await this.upsert(createCategoryDto, ['name']);

      return await this.findOneById({ id: (identifiers[0] as ObjectLiteral).id as number }) as Category;
    },

    async updateOne(category: Category, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse> {
      const mergedCategory = await this.merge(category, updateCategoryDto);

      const { id: updatedId, updatedAt } = await this.save(mergedCategory);

      return { message: 'Category was updated successfully', id: updatedId, updatedAt: updatedAt?.toISOString() };
    },
  });
