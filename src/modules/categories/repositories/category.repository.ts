import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { DeleteResponse, UpdateResponse } from 'src/@types';
import type { ObjectLiteral } from 'typeorm';
import { Repository } from 'typeorm';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { Category } from '../entities';

@Injectable()
export default class CategoryRepository {

  constructor(@InjectRepository(Category) private readonly baseCategoryRepository: Repository<Category>) { }

  public async findAll(): Promise<Category[] | void> {
    try {
      const categories = await this.baseCategoryRepository.find({
        select: {
          id: true,
          name: true,
        },
      });

      if (!categories.length) throw new NotFoundException('Categories weren\'t found');
      return categories;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Category | void> {
    try {
      const category = await this.baseCategoryRepository.findOne({
        select: {
          id: true,
          name: true,
        },
        where: {
          id,
        },
      });

      if (!category) throw new NotFoundException('Category with given ID was not found');

      return category;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async createOne(createCategoryDto: CreateCategoryDto): Promise<Category | void> {
    try {

      const { identifiers } = await this.baseCategoryRepository.upsert(createCategoryDto, ['name']);

      const category =
        await this.baseCategoryRepository.findOneBy({ id: (identifiers[0] as ObjectLiteral).id as number }) as Category;

      return category;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOne(id: number, updateCategoryDto: UpdateCategoryDto)
    : Promise<UpdateResponse | void> {
    try {
      const category = await this.baseCategoryRepository.findOneBy({ id });
      if (!category) throw new NotFoundException('Category to update was not found');

      const mergedCategory = await this.baseCategoryRepository.merge(category, updateCategoryDto);

      const { id: updatedId, updatedAt } = await this.baseCategoryRepository.save(mergedCategory);

      return { message: 'Category was updated successfully', id: updatedId, updatedAt: updatedAt.toISOString() };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteOne(id: number): Promise<DeleteResponse | void> {
    try {
      const category = await this.baseCategoryRepository.findOneBy({ id });
      if (!category) throw new NotFoundException('Category to delete was not found');

      const { id: deletedId } = await this.baseCategoryRepository.remove(category);

      return { message: 'Category was deleted successfully', id: deletedId };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

}
