import {
  Body, Controller, Delete, Get, HttpCode,
  HttpStatus, Param, ParseIntPipe, Post, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import { User } from '../../users/entities';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import type { CartItem } from '../entities';
import CartItemService from '../services/cart-item.service.abstract';

@ApiTags('User cart')
@Controller('user/cart')
export class CartItemController {

  constructor(private readonly cartItemService: CartItemService) { }

  @UseGuards(JwtGuard)
  @Get()
  public findAllCartItems(@UserDecorator() user: User): Promise<CartItem[]> {
    return this.cartItemService.findAllCartItems(user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public findOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.findOneCartItem(id, user.id);
  }

  @UseGuards(JwtGuard)
  @Post()
  public createOneCartItem(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem | void> {
    return this.cartItemService.createOneCartItem(user, createCartItemDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  public deleteOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cartItemService.deleteOneCartItem(id, user.id);
  }

}
