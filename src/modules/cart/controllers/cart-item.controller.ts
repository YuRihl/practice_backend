import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { User } from '../../users/entities';
import type { CartItem } from '../entities';
import ICartItemService from '../services/cart-item.service.abstract';

@Controller('user/cart')
export class CartItemController {

  constructor(private readonly cartItemService: ICartItemService) { }

  @UseGuards(JwtGuard)
  @Post()
  public create(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<void | CartItem> {
    return this.cartItemService.create(user, createCartItemDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  public findAll(@UserDecorator() user: User): Promise<CartItem[]> {
    return this.cartItemService.findAll(user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public findOne(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.findOne(user, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  public remove(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.remove(user, id);
  }

}
