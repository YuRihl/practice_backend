import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import type { UpdateResponse } from 'src/@types';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';
import { ICategoryRepository } from '../interfaces';
import { CategoryRepository } from '../repositories/category.repository';
import CategoryService from './category.service.abstract';

@Injectable()
export class CategoryServiceImpl extends CategoryService {

  constructor(@Inject(CategoryRepository) private categoryRepository: ICategoryRepository) {
    super();
  }

  public async findAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async findOneCategory(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneById(id);

      if (!category) throw new NotFoundException('Category with given ID was not found');

      return category;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createOneCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.createOne(createCategoryDto);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse> {
    try {
      const category = await this.categoryRepository.findOneById({ id });
      if (!category) throw new NotFoundException('Category to update was not found');

      return await this.categoryRepository.updateOne(category, updateCategoryDto);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async deleteOneCategory(id: number): Promise<void> {
    try {
      const category = await this.categoryRepository.findOneById({ id });
      if (!category) throw new NotFoundException('Category to delete was not found');

      await this.categoryRepository.deleteOne(category);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

}
