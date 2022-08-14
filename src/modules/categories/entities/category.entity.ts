import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../../products/entities';

@Entity()
export class Category {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public name!: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @ApiProperty({ type: () => ProductCategory })
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  public products!: ProductCategory[];

}
