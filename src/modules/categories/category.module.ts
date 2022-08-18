import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryServiceImpl } from './services/category.service';
import { Category } from './entities';
import CategoryService from './services/category.service.abstract';
import { CategoryRepository, CategoryRepositoryFactory } from './repositories/category.repository';

const categoryService = { provide: CategoryService, useClass: CategoryServiceImpl };

const categoryRepository = {
  provide: CategoryRepository,
  useFactory: CategoryRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [categoryService, categoryRepository],
})
export class CategoryModule { }
