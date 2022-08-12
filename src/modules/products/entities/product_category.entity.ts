import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '.';

@Entity()
export class ProductCategory {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.categories)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category!: Category;

}
