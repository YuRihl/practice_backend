import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities';
import { OrderItem } from '.';

export enum OrderStatus {
  Pending,
  Processing,
  Completed,
  Declined,
  Failed
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  public status!: OrderStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @OneToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public items!: OrderItem[];

}
