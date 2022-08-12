import { IsInt, IsPositive } from 'class-validator';

export class CreateCartItemDto {

  @IsPositive()
  public productId!: number;

  @IsInt()
  public itemCount!: number;

}
