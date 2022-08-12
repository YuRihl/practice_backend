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
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';

import { ApiCreatedResponse } from '@nestjs/swagger';
import type { Product } from '../entities';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Get()
  public async findAllProducts(
    // @Query('category', new DefaultValuePipe('All Category')) category: string,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name', new DefaultValuePipe('')) name: string,
  ): Promise<Product[]> {
    return await this.productService.findAllProducts(perPage, page, name);
  }

  @Get(':id')
  public async findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findOneProduct(id);
  }

  @ApiCreatedResponse()
  @Post()
  public async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

}
