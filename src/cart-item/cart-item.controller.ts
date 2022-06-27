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

@Controller('user/cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartItemService.create(user, createCartItemDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@UserDecorator() user: User) {
    return this.cartItemService.findAll(user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.cartItemService.findOne(user, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.cartItemService.remove(user, id);
  }
}
