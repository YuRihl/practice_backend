import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { Order } from '.';

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'int', name: 'order_count' })
  public orderCount!: number;

  @Column({ type: 'money', name: 'order_price' })
  public orderPrice!: number;

  @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  public order!: Order;

}
