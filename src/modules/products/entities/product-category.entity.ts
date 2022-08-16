import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '.';
import { Category } from '../../categories/entities';

@Entity()
export class ProductCategory {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  public category!: Category;

}
