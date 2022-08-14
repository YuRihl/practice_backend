import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { Order } from '.';

@Entity()
export class OrderItem {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ApiProperty()
  @Column({ type: 'int', name: 'order_count' })
  public orderCount!: number;

  @ApiProperty()
  @Column({ type: 'money', name: 'order_price' })
  public orderPrice!: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  public order!: Order;

}
