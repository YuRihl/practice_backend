import {
  Body, Controller, DefaultValuePipe, Delete, Get, HttpCode,
  HttpStatus, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import { User } from '../../users/entities';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from '../dtos';
import { OrderStatus } from '../entities/order-status.enum';
import { OrderService } from '../services';

@ApiTags('User order history')
@Controller('user/orders')
export class OrderController {

  constructor(private readonly orderService: OrderService) { }

  @UseGuards(JwtGuard)
  @Get()
  public async findAllOrders(@UserDecorator() user: User,
    @Query('status', new DefaultValuePipe(OrderStatus.Pending), new ParseEnumPipe(OrderStatus)) status: OrderStatus)
    : Promise<OrderDto[]> {
    return OrderDto.fromEntities(await this.orderService.findAllOrders(user.id, status));
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public async findOneOrder(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<OrderDto> {
    return OrderDto.fromEntity(await this.orderService.findOneOrder(id, user.id));
  }

  @UseGuards(JwtGuard)
  @Post()
  public async createOneOrder(@UserDecorator() user: User,
    @Body(new ParseArrayPipe({ items: CreateOrderDto })) createOrderDtos: CreateOrderDto[]): Promise<OrderDto> {
    return OrderDto.fromEntity(await this.orderService.createOneOrder(user, createOrderDtos));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  public updateOneOrder(@UserDecorator() user: User,
    @Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto)
    : Promise<UpdateResponse> {
    return this.orderService.updateOneOrder(id, user.id, updateOrderDto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneOrder(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.deleteOneOrder(id, user.id);
  }

}
