import { IsPositive } from 'class-validator';

export class CreateCartItemDto {

  @IsPositive()
  public productId!: number;

  @IsPositive()
  public itemCount: number = 1;

}
