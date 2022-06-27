import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart-item/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'Id is generated automatically, dont send it!' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    minimum: 5,
    maximum: 50,
  })
  @Column({ unique: true, length: 50 })
  email: string;

  @ApiProperty({ minimum: 6, maximum: 100 })
  @Column({ length: 100 })
  password: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @ApiProperty({ minimum: 1, maximum: 50 })
  @Column({ name: 'second_name', length: 50 })
  secondName: string;

  @ApiProperty({
    description:
      'Date when user profile was created, changes only once user is created',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description:
      'Date when information about user was changed, changes every time when information is changed',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}
