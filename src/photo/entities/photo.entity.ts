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
  public id!: number;

  @ApiProperty()
  @Column({ length: 50 })
  public name!: string;

  @ApiProperty()
  @Column({ type: 'bytea' })
  public data!: Uint8Array;

  @ApiProperty()
  @OneToOne(() => Product, (product) => product.photo, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  public product?: Product;

  @ApiProperty()
  @OneToOne(() => Category, (category) => category.photo, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  public category?: Category;

  @ApiProperty()
  @ManyToOne(() => ProductInfo, (productInfo) => productInfo.photos, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_info_id' })
  public productInfo?: ProductInfo;

}
