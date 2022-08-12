import type { Category } from '../entities/category.entity';

interface ICategoryService {
    findCategories(): Promise<Category[]>;
}

export default ICategoryService;
