import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ['name', 'price'])) {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public name?: string;

  @IsOptional()
  @IsPositive()
  public price?: number;

}
