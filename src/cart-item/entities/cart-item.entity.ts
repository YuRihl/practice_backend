import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['product'])
export class CartItem {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ApiProperty({ minimum: 0, default: 0 })
  @Column({ type: 'int', name: 'item_count', default: 0 })
  public itemCount!: number;

}
