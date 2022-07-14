import { ApiProperty } from '@nestjs/swagger';
import { Photo } from 'src/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '.';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description:
      'Date when category instance was created, changes only once category is created',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description:
      'Date when information about category was changed, changes every time when information is changed',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => Product })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ApiProperty({ type: () => Photo })
  @OneToOne(() => Photo, (photo) => photo.category)
  photo: Photo;
}
