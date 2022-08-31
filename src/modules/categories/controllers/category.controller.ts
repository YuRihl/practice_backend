import {
  Body, Controller, Delete, Get, HttpCode,
  HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../../@framework/decorators';
import { JwtGuard, RolesGuard } from '../../../@framework/guards';

import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { CategoryService } from '../services';

@ApiTags('Product Category')
@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  public async findAllCategories(): Promise<CategoryDto[]> {
    return CategoryDto.fromEntities(await this.categoryService.findAllCategories());
  }

  @Get(':id')
  public async findOneCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return CategoryDto.fromEntity(await this.categoryService.findOneCategory(id));
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  public async createOneCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return CategoryDto.fromEntity(await this.categoryService.createOneCategory(createCategoryDto));
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  public updateOneCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto)
    : Promise<UpdateResponse> {
    return this.categoryService.updateOneCategory(id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.deleteOneCategory(id);
  }

}
