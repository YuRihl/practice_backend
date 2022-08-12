import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/modules/cart/entities';
import { ProductCategory } from '.';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from 'src/modules/orders/entities/order-item.entity';

@Entity()
export class Product {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  public name!: string;

  @ApiProperty()
  @Column({ type: 'money' })
  public price!: number;

  @ApiProperty()
  @Column({ type: 'int', name: 'available_count', default: 0 })
  public availableCount!: number;

  @ApiProperty()
  @Column({ type: 'int', name: 'sold_count', default: 0 })
  public soldCount!: number;

  @ApiProperty()
  @Column({ type: 'text', default: '' })
  public description!: string;

  @ApiProperty()
  @Column({ type: 'text', default: '' })
  public content!: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @ApiProperty({ type: () => ProductCategory })
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  public categories!: ProductCategory[];

  @ApiProperty({ type: () => CartItem })
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  public cartItems!: CartItem[];

  @ApiProperty({ type: () => OrderItem })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  public orders!: OrderItem[];

}
