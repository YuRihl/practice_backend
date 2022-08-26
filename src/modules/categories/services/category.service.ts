import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UpdateResponse } from '../../../@types';
import type { FindOptionsSelect } from 'typeorm';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';
import { ICategoryRepository } from '../interfaces';
import { CategoryRepository } from '../repositories/category.repository';
import CategoryService from './category.service.abstract';

@Injectable()
export class CategoryServiceImpl extends CategoryService {

  private _selectOptions: FindOptionsSelect<Category> = {
    id: true,
    name: true,
  };

  constructor(@Inject(CategoryRepository) private categoryRepository: ICategoryRepository) {
    super();
  }

  public async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      select: this._selectOptions,
    });
  }

  public async findOneCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      select: this._selectOptions,
      where: { id },
    });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);

    return category;
  }

  public async createOneCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createOne(createCategoryDto);
  }

  public async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResponse> {
    const category = await this.findOneCategory(id);

    return await this.categoryRepository.updateOne(category, updateCategoryDto);
  }

  public async deleteOneCategory(id: number): Promise<void> {
    const category = await this.findOneCategory(id);

    await this.categoryRepository.remove(category);
  }

}
