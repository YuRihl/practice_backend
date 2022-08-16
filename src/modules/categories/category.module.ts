import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities';
import ICategoryService from './services/category.service.abstract';
import CategoryRepository from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryRepository],
  controllers: [CategoryController],
  providers: [{
    provide: ICategoryService,
    useClass: CategoryService,
  }, CategoryRepository],
})
export class CategoryModule { }
