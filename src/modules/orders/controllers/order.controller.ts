import {
  Body, Controller, DefaultValuePipe, Delete, Get, HttpCode,
  HttpStatus, Param, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDecorator } from 'src/@framework/decorators';
import { User } from '../../users/entities';
import { JwtGuard } from '../../../@framework/guards';
import OrderService from '../services/order.service.abstract';
import { OrderStatus } from '../entities';
import type { Order } from '../entities';
import { CreateOrderDto, UpdateOrderDto } from '../dtos';
import type { UpdateResponse } from 'src/@types';

@Controller('user/orders')
export class OrderController {

  constructor(private readonly orderService: OrderService) { }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get()
  public findAllOrders(@UserDecorator() user: User,
    @Query('status', new DefaultValuePipe(OrderStatus.Pending), new ParseEnumPipe(OrderStatus)) status: OrderStatus)
    : Promise<Order[]> {
    return this.orderService.findAllOrders(user, status);
  }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get(':id')
  public findOneOrder(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOneOrder(user, id);
  }

  @ApiCreatedResponse()
  @UseGuards(JwtGuard)
  @Post()
  public createOneOrder(@UserDecorator() user: User,
    @Body(new ParseArrayPipe({ items: CreateOrderDto })) createOrderDtos: CreateOrderDto[]): Promise<Order> {
    return this.orderService.createOneOrder(user, createOrderDtos);
  }

  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Patch(':id')
  public updateOneOrder(@UserDecorator() user: User,
    @Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto)
    : Promise<UpdateResponse> {
    return this.orderService.updateOneOrder(user, id, updateOrderDto);
  }

  @ApiNoContentResponse()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public deleteOneOrder(@UserDecorator() user: User, @Param('id', ParseIntPipe) id: number): void {
    this.orderService.deleteOneOrder(user, id);
  }

}
