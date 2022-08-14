import type { Category } from '../entities';

export default abstract class ICategoryService {

  public abstract findCategories(): Promise<Category[]>;

}
