import { ApiProperty } from '@nestjs/swagger';
import { Category, Product, ProductInfo } from 'src/product/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @Column({ type: 'bytea' })
  data: Uint8Array;

  @ApiProperty()
  @OneToOne(() => Product, (product) => product.photo, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ApiProperty()
  @OneToOne(() => Category, (category) => category.photo, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ApiProperty()
  @ManyToOne(() => ProductInfo, (productInfo) => productInfo.photos, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_info_id' })
  productInfo?: ProductInfo;
}
