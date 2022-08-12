import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public name!: string;

  @IsPositive()
  public price!: number;

  @IsInt()
  @Min(0)
  public soldCount!: number;

  @IsString()
  @IsNotEmpty()
  public description!: string;

  @IsString()
  public title!: string;

  @IsString()
  public text!: string;

  @IsPositive()
  public categoryId!: number;

  @IsPositive()
  public photoId!: number;

}
