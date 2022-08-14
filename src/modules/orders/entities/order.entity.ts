import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  public status!: OrderStatus;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ApiProperty({ type: () => OrderItem })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public items!: OrderItem[];

}
