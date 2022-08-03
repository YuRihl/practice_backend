import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>) { }

  public async findCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });

  }

}
