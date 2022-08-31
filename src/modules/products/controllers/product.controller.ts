import {
  Body, Controller, DefaultValuePipe, Delete, Get, HttpCode,
  HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Role, Roles } from '../../../@framework/decorators';
import { JwtGuard, RolesGuard } from '../../../@framework/guards';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dtos';
import { ProductService } from '../services';

@ApiTags('Product')
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Get()
  public async findAllProducts(
    @Query('categories', new DefaultValuePipe(['All Category']),
      new ParseArrayPipe({ items: String, separator: ',' })) categories: string[],
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('per_page', new DefaultValuePipe(0), ParseIntPipe) perPage: number,
  ): Promise<ProductDto[]> {
    return ProductDto.fromEntities(await this.productService.findAllProducts(categories, name, page, perPage));
  }

  @Get(':id')
  public async findOneProduct(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    return ProductDto.fromEntity(await this.productService.findOneProduct(id));
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  public async createOneProduct(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return ProductDto.fromEntity(await this.productService.createOneProduct(createProductDto));
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  public updateOneProduct(
    @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    return this.productService.updateOneProduct(id, updateProductDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.deleteOneProduct(id);
  }

}
