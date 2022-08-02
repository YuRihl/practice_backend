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
import { UserDecorator } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/user/entities';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import type { CartItem } from './entities';

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
