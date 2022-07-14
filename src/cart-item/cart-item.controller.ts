import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
