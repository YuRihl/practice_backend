import { Controller, Get } from '@nestjs/common';
import type { Category } from '../entities';
import ICategoryService from '../services/category.service.abstract';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: ICategoryService) { }

  @Get()
  public findCategories(): Promise<Category[]> {
    return this.categoryService.findCategories();
  }

}
