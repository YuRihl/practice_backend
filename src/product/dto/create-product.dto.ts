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
  public name!: string;

  @ApiProperty({ minimum: 0 })
  @IsPositive()
  public price!: number;

  @ApiProperty({ description: 'How many items of product is sold', minimum: 0 })
  @IsInt()
  @Min(0)
  public soldCount!: number;

  @ApiProperty({ description: 'General information about product item' })
  @IsString()
  @IsNotEmpty()
  public description!: string;

  @ApiProperty({ description: 'Full information about product item' })
  @IsString()
  public title!: string;

  @ApiProperty({ description: 'Full information about product item' })
  @IsString()
  public text!: string;

  @ApiProperty()
  @IsPositive()
  public categoryId!: number;

  @ApiProperty()
  @IsPositive()
  public photoId!: number;

}
