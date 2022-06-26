import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ minimum: 0 })
  price: number;

  @ApiProperty({ description: 'How many items of product is sold', minimum: 0 })
  soldCount: number;

  @ApiProperty({ description: 'General information about product item' })
  description: string;

  @ApiProperty({ description: 'Full information about product item' })
  fullInfo: string;
}
