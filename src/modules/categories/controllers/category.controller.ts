import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { UpdateResponse } from '../../../@types';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import type { Category } from '../entities';
import CategoryService from '../services/category.service.abstract';

@ApiTags('Product Category')
@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  public findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  public findOneCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOneCategory(id);
  }

  @Post()
  public createOneCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createOneCategory(createCategoryDto);
  }

  @Patch(':id')
  public updateOneCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto)
    : Promise<UpdateResponse> {
    return this.categoryService.updateOneCategory(id, updateCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.deleteOneCategory(id);
  }

}
