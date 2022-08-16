import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import type { DeleteResponse, UpdateResponse } from 'src/@types';
import { UpdateCategoryDto } from '../dtos';
import { CreateCategoryDto } from '../dtos';
import type { Category } from '../entities';
import ICategoryService from '../services/category.service.abstract';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: ICategoryService) { }

  @ApiOkResponse()
  @Get()
  public findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories() as Promise<Category[]>;
  }

  @ApiOkResponse()
  @Get(':id')
  public findOneCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOneCategory(id) as Promise<Category>;
  }

  @ApiCreatedResponse()
  @Post()
  public createOneCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createOneCategory(createCategoryDto) as Promise<Category>;
  }

  @ApiOkResponse()
  @Patch(':id')
  public updateOneCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto)
    : Promise<UpdateResponse> {
    return this.categoryService.updateOneCategory(id, updateCategoryDto) as Promise<UpdateResponse>;
  }

  @ApiOkResponse()
  @Delete(':id')
  public deleteOneCategory(@Param('id', ParseIntPipe) id: number): Promise<DeleteResponse> {
    return this.categoryService.deleteOneCategory(id) as Promise<DeleteResponse>;
  }

}
