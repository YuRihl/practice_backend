import { ApiProperty } from '@nestjs/swagger';
import { Photo } from 'src/photo/entities';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './';

@Entity()
export class ProductInfo {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ length: 100 })
  public title!: string;

  @ApiProperty()
  @Column({ type: 'text' })
  public text!: string;

  @ApiProperty({ type: () => Product })
  @OneToOne(() => Product, (product) => product.info)
  public product!: Product;

  @ApiProperty({ type: () => Photo })
  @OneToMany(() => Photo, (photo) => photo.productInfo)
  public photos!: Photo[];

}
