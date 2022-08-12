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
import { UserDecorator } from 'src/@framework/decorators';
import { JwtGuard } from 'src/@framework/guards';
import { User } from 'src/modules/users/entities';
import { CartItemService } from '../services/cart-item.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import type { CartItem } from '../entities';

@Controller('user/cart')
export class CartItemController {

  constructor(private readonly cartItemService: CartItemService) { }

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return await this.cartItemService.create(user, createCartItemDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  public async findAll(@UserDecorator() user: User): Promise<CartItem[]> {
    return this.cartItemService.findAll(user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public async findOne(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.findOne(user, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  public async remove(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<CartItem> {
    return this.cartItemService.remove(user, id);
  }

}
