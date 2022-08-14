import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities';
import ICategoryService from './services/category.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [{
    provide: ICategoryService,
    useClass: CategoryService,
  }],
})
export class CategoryModule { }
