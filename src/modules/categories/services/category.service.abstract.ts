import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';

export default abstract class ICategoryService {

  public abstract findAllCategories(): Promise<Category[] | void>;
  public abstract findOneCategory(id: number): Promise<Category | void>;
  public abstract createOneCategory(createCategoryDto: CreateCategoryDto): Promise<Category | void>;
  public abstract updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto)
    : Promise<{ message: string; updatedAt: string } | void>;
  public abstract deleteOneCategory(id: number): Promise<{ message: string } | void>;

}
