import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/modules/products/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
