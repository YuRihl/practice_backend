import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities';
import { OrderItem } from '.';

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Declined = 'Declined',
  Failed = 'Failed'
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  public status!: OrderStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public items!: OrderItem[];

}
