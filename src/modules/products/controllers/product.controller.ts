import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  ParseArrayPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import type { Product } from '../entities';
import ProductService from '../services/product.service.abstract';
import { UpdateProductDto } from '../dtos/update-product.dto';
import type { UpdateResponse } from 'src/@types';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @ApiOkResponse()
  @Get()
  public findAllProducts(
    @Query('categories', new DefaultValuePipe('All Category'),
      new ParseArrayPipe({ items: String, separator: ',' })) categories: string[],
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
  ): Promise<Product[]> {
    return this.productService.findAllProducts(categories, name, page, perPage) as Promise<Product[]>;
  }

  @ApiOkResponse()
  @Get(':id')
  public findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOneProduct(id) as Promise<Product>;
  }

  @ApiCreatedResponse()
  @Post()
  public createOneProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createOneProduct(createProductDto) as Promise<Product>;
  }

  @ApiOkResponse()
  @Patch(':id')
  public updateOneProduct(
    @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    return this.productService.updateOneProduct(id, updateProductDto) as Promise<UpdateResponse>;
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneProduct(@Param('id', ParseIntPipe) id: number): void {
    this.productService.deleteOneProduct(id);
  }

}
