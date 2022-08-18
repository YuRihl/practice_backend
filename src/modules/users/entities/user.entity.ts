import { CartItem } from '../../cart/entities';
import { Order } from '../../orders/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  public email!: string;

  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  public isVerified!: boolean;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  public password!: string;

  @Column({ type: 'varchar', length: 50, name: 'first_name' })
  public firstName!: string;

  @Column({ type: 'varchar', length: 50, name: 'second_name' })
  public secondName!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @OneToOne(() => Order, (order) => order.user)
  public order!: Order;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  public cartItems!: CartItem[];

}
