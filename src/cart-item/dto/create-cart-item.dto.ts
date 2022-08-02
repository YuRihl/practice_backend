import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCartItemDto {

  @ApiProperty()
  @IsPositive()
  public productId!: number;

  @ApiProperty()
  @IsInt()
  public itemCount!: number;

}
