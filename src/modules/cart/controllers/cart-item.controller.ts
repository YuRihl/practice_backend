import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { User } from '../../users/entities';
import type { CartItem } from '../entities';
import CartItemService from '../services/cart-item.service.abstract';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('user/cart')
export class CartItemController {

  constructor(private readonly cartItemService: CartItemService) { }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get()
  public findAllCartItems(@UserDecorator() user: User): Promise<CartItem[]> {
    return this.cartItemService.findAllCartItems(user);
  }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get(':id')
  public findOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.findOneCartItem(user, id);
  }

  @ApiCreatedResponse()
  @UseGuards(JwtGuard)
  @Post()
  public createOneCartItem(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem | void> {
    return this.cartItemService.createOneCartItem(user, createCartItemDto);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  public deleteOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): void {
    this.cartItemService.deleteOneCartItem(user, id);
  }

}
