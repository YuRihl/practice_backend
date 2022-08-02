import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart-item/entities';
import { Photo } from 'src/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category, ProductInfo } from './';

@Entity()
export class Product {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ length: 50 })
  public name!: string;

  @ApiProperty({ minimum: 0 })
  @Column({ type: 'money', scale: 2 })
  public price!: number;

  @ApiProperty({ description: 'How many items of product is sold', minimum: 0 })
  @Column({ type: 'int', name: 'sold_count' })
  public soldCount!: number;

  @ApiProperty({ description: 'General information about product item' })
  @Column({ type: 'text' })
  public description!: string;

  @ApiProperty({
    description:
      'Date when product item instance was created, changes only once product is created',
  })
  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty({
    description:
      'Date when information about product item was changed, changes every time when information is changed',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date;

  @ApiProperty({
    type: () => Category,
    description: 'Category of product: sport, gaming, food etc',
  })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category!: Category;

  @ApiProperty()
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  public cartItems!: CartItem[];

  @ApiProperty({ type: () => ProductInfo })
  @OneToOne(() => ProductInfo, (productInfo) => productInfo.product)
  @JoinColumn({ name: 'product_info_id' })
  public info!: ProductInfo;

  @ApiProperty({ type: () => Photo })
  @OneToOne(() => Photo, (photo) => photo.product)
  public photo!: Photo;

}
