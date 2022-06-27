import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsPositive()
  productId: number;

  @ApiProperty()
  @IsPositive()
  itemCount: number;
}
