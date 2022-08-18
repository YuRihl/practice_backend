import { Product } from '../../products/entities';
import { User } from '../../users/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'int', name: 'item_count', default: 0 })
  public itemCount!: number;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

}
