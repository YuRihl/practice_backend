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
  public findAll(@UserDecorator() user: User): Promise<CartItem[]> {
    return this.cartItemService.findAll(user);
  }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.findOne(id);
  }

  @ApiCreatedResponse()
  @UseGuards(JwtGuard)
  @Post()
  public create(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem | void> {
    return this.cartItemService.create(user, createCartItemDto);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): void {
    this.cartItemService.remove(id);
  }

}
