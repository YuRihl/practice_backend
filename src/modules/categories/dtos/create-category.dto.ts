import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public name!: string;

}
