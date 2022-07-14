import { ApiProperty } from '@nestjs/swagger';
import { Photo } from 'src/photo/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './';

@Entity()
export class ProductInfo {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  @ApiProperty()
  @OneToOne(() => Product, (product) => product.info)
  product: Product;

  @ApiProperty({ type: () => Photo })
  @OneToMany(() => Photo, (photo) => photo.productInfo)
  photos: Photo[];
}
