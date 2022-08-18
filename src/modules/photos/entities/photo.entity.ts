import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar' })
  public path!: string;

  @Column({ type: 'varchar' })
  public type!: string;

  @Column({ type: 'int' })
  public size!: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

}
