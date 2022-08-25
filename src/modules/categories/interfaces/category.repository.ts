import type { UpdateResponse } from 'src/@types';
import type { Repository } from 'typeorm';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';

interface CustomRepository {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  createOne(createCategoryDto: CreateCategoryDto): Promise<Category>;
  updateOne(category: Category, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse>;
  deleteOne(category: Category): Promise<void>;
}

type ICategoryRepository = CustomRepository & Repository<Category>

export type { ICategoryRepository };
