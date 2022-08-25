import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryServiceImpl } from './services/category.service';
import CategoryService from './services/category.service.abstract';
import { CategoryRepository, CategoryRepositoryFactory } from './repositories/category.repository';

const categoryService = { provide: CategoryService, useClass: CategoryServiceImpl };

const categoryRepository = {
  provide: CategoryRepository,
  useFactory: CategoryRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [],
  exports: [categoryService],
  controllers: [CategoryController],
  providers: [categoryService, categoryRepository],
})
export class CategoryModule { }
