import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import type { ProductCategory } from '../../products/entities';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

  @IsOptional()
  declare public name?: string;

  @IsOptional()
  declare public products?: ProductCategory[];

}
