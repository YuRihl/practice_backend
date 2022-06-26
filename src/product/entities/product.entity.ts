import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    type: () => Category,
    description: 'Category of product: sport, gaming, food etc',
  })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({ minimum: 0 })
  @Column('money')
  price: number;

  @ApiProperty({ description: 'How many items of product is sold', minimum: 0 })
  @Column({ type: 'int', name: 'sold_count' })
  soldCount: number;

  @ApiProperty({ description: 'General information about product item' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Full information about product item' })
  @Column({ type: 'text', name: 'full_info' })
  fullInfo: string;

  @ApiProperty({
    description:
      'Date when product item instance was created, changes only once product is created',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description:
      'Date when information about product item was changed, changes every time when information is changed',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
