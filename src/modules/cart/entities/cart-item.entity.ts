import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities';
import { User } from 'src/modules/users/entities';
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
  public id!: number;

  @ApiProperty()
  @Column({ type: 'int', name: 'item_count', default: 0 })
  public itemCount!: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

}
