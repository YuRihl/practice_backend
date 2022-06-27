import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty({ minimum: 1 })
  @Column({ type: 'int', name: 'item_count' })
  itemCount: number;
}
