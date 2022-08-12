import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/modules/cart/entities';
import { Order } from 'src/modules/orders/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, unique: true })
  public email!: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  public isVerified!: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  public password!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, name: 'first_name' })
  public firstName!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, name: 'second_name' })
  public secondName!: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @ApiProperty({ type: () => Order })
  @OneToOne(() => Order, (order) => order.user)
  public order!: Order;

  @ApiProperty({ type: () => CartItem })
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  public cartItems!: CartItem[];

}
