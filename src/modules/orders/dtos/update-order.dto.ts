import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities';

export class UpdateOrderDto {

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus', name: 'status' })
  @IsOptional()
  @IsEnum(OrderStatus)
  public status?: OrderStatus;

}
