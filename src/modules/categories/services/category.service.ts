import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { DeleteResponse, UpdateResponse } from 'src/@types';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';
import CategoryRepository from '../repositories/category.repository';
import type ICategoryService from './category.service.abstract';

@Injectable()
export class CategoryService implements ICategoryService {

  constructor(private categoryRepository: CategoryRepository) { }

  public async findAllCategories(): Promise<Category[] | void> {
    try {
      const categories = this.categoryRepository.findAll();

      return categories;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneCategory(id: number): Promise<void | Category> {
    try {
      const category = this.categoryRepository.findOneById(id);

      return category;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async createOneCategory(createCategoryDto: CreateCategoryDto): Promise<void | Category> {
    try {
      const category = this.categoryRepository.createOne(createCategoryDto);

      return category;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto)
    : Promise<UpdateResponse | void> {
    try {
      return this.categoryRepository.updateOne(id, updateCategoryDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteOneCategory(id: number): Promise<DeleteResponse | void> {
    try {
      return this.categoryRepository.deleteOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

}
