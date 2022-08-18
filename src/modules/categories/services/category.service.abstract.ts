import type { UpdateResponse } from 'src/@types';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';

export default abstract class CategoryService {

  public abstract findAllCategories(): Promise<Category[]>;
  public abstract findOneCategory(id: number): Promise<Category>;
  public abstract createOneCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
  public abstract updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse>;
  public abstract deleteOneCategory(id: number): Promise<void>;

}
