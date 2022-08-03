import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

import { ApiCreatedResponse } from '@nestjs/swagger';
import type { Category } from './entities';
import { Product } from './entities';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Get()
  public async findAllProducts(
    @Query('category') category: string,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name') name: string,
  ): Promise<Product[]> {
    return await this.productService.findAllProducts(category, perPage, page, name);
  }

  @Get('categories')
  public async findCategories(): Promise<Category[]> {
    return await this.productService.findCategories();
  }

  @Get(':id')
  public async findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findOneProduct(id);
  }

  @ApiCreatedResponse({
    description: 'The product was created successfully',
    type: Product,
  })
  @Post()
  public async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

}
