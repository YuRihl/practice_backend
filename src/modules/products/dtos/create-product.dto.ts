import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
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

  @IsOptional()
  @IsInt()
  @Min(0)
  public availableCount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  public soldCount?: number;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public categories?: string[];

}
