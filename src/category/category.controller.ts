import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import type { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  public async findCategories(): Promise<Category[]> {
    return await this.categoryService.findCategories();
  }

}
