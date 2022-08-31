import {
  Body, Controller, Delete, Get, HttpCode,
  HttpStatus, Param, ParseIntPipe, Post, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import { User } from '../../users/entities';
import { CartItemDto, CreateCartItemDto } from '../dtos';
import { CartItemService } from '../services';

@ApiTags('User cart')
@Controller('user/cart')
export class CartItemController {

  constructor(private readonly cartItemService: CartItemService) { }

  @UseGuards(JwtGuard)
  @Get()
  public async findAllCartItems(@UserDecorator() user: User): Promise<CartItemDto[]> {
    return CartItemDto.fromEntities(await this.cartItemService.findAllCartItems(user.id));
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public async findOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number)
    : Promise<CartItemDto> {
    return CartItemDto.fromEntity(await this.cartItemService.findOneCartItem(id, user.id));
  }

  @UseGuards(JwtGuard)
  @Post()
  public async createOneCartItem(
    @UserDecorator() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemDto | void> {
    const result = await this.cartItemService.createOneCartItem(user, createCartItemDto);
    if (result) return CartItemDto.fromEntity(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  public deleteOneCartItem(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cartItemService.deleteOneCartItem(id, user.id);
  }

}
