import type { Repository } from 'typeorm';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';

interface CustomRepository {
  createOne(createCategoryDto: CreateCategoryDto): Promise<Category>;
  updateOne(category: Category, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse>;
}

type ICategoryRepository = CustomRepository & Repository<Category>

export type { ICategoryRepository };
