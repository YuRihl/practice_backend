import { ApiCreatedResponse } from '@nestjs/swagger';
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
import { CreateProductDto } from '../dtos/create-product.dto';
import type { Product } from '../entities';
import IProductService from '../services/product.service.abstract';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: IProductService) { }

  @Get()
  public findAllProducts(
    // @Query('category', new DefaultValuePipe('All Category')) category: string,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('name', new DefaultValuePipe('')) name: string,
  ): Promise<Product[]> {
    return this.productService.findAllProducts(perPage, page, name);
  }

  @Get(':id')
  public findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOneProduct(id);
  }

  @ApiCreatedResponse()
  @Post()
  public create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

}
