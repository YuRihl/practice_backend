import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsPositive()
  productId: number;

  @ApiProperty()
  @IsInt()
  itemCount: number;
}
