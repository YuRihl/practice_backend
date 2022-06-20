import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ unique: true, length: 50 })
  email: string;

  @ApiProperty()
  @Column({ length: 100 })
  password: string;

  @ApiProperty()
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @ApiProperty()
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
}
