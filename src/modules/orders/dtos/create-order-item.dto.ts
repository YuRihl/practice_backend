import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CreateOrderItemDto {

  @ApiProperty()
  @Min(1)
  public productId!: number;

  @ApiProperty()
  @Min(1)
  public productCount!: number;

}
