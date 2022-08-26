import { Min } from 'class-validator';

export class CreateOrderDto {

  @Min(1)
  public productId!: number;

  @Min(1)
  public productCount!: number;

}

