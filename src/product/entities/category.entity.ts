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
  public id!: number;

  @ApiProperty()
  @Column({ length: 50 })
  public name!: string;

  @ApiProperty({
    description:
      'Date when category instance was created, changes only once category is created',
  })
  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty({
    description:
      'Date when information about category was changed, changes every time when information is changed',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date;

  @ApiProperty({ type: () => Product })
  @OneToMany(() => Product, (product) => product.category)
  public products!: Product[];

  @ApiProperty({ type: () => Photo })
  @OneToOne(() => Photo, (photo) => photo.category)
  public photo!: Photo;

}
