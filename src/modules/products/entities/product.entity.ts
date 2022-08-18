import { ProductCategory } from '.';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from '../../cart/entities';
import { OrderItem } from '../../orders/entities';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'money' })
  public price!: number;

  @Column({ type: 'int', name: 'available_count', default: 0 })
  public availableCount!: number;

  @Column({ type: 'int', name: 'sold_count', default: 0 })
  public soldCount!: number;

  @Column({ type: 'text', default: '' })
  public description!: string;

  @Column({ type: 'text', default: '' })
  public content!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  public categories!: ProductCategory[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  public cartItems!: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  public orders!: OrderItem[];

}
