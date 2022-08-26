import {
  Body, Controller, DefaultValuePipe, Delete, Get, HttpCode,
  HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { UpdateResponse } from '../../../@types';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import type { Product } from '../entities';
import ProductService from '../services/product.service.abstract';

@ApiTags('Product')
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Get()
  public findAllProducts(
    @Query('categories', new DefaultValuePipe(['All Category']),
      new ParseArrayPipe({ items: String, separator: ',' })) categories: string[],
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
  ): Promise<Product[]> {
    return this.productService.findAllProducts(categories, name, page, perPage);
  }

  @Get(':id')
  public findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOneProduct(id);
  }

  @Post()
  public createOneProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createOneProduct(createProductDto);
  }

  @Patch(':id')
  public updateOneProduct(
    @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    return this.productService.updateOneProduct(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.deleteOneProduct(id);
  }

}
