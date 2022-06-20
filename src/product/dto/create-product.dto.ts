import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ minimum: 0 })
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'How many items of product is sold', minimum: 0 })
  @IsInt()
  @Min(0)
  soldCount: number;

  @ApiProperty({ description: 'General information about product item' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Full information about product item' })
  @IsString()
  fullInfo: string;
}
