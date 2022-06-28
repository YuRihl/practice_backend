import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Product } from './entities';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllProducts(
    @Query('category') category: string,
    @Query('per_page') perPage: string,
    @Query('page') page: string,
    @Query('name') name: string,
  ) {
    return this.productService.findAllProducts(category, +perPage, +page, name);
  }

  @Get('categories')
  findCategories() {
    return this.productService.findCategories();
  }

  @Get(':id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneProduct(id);
  }

  @ApiCreatedResponse({
    description: 'The product was created successfully',
    type: Product,
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
