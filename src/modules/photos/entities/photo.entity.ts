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

  @Column({ type: 'varchar', default: '' })
  public path!: string;

  @Column({ type: 'varchar' })
  public type!: string;

  @Column({ type: 'int' })
  public size!: number;

  @Column({ type: 'varchar', default: '' })
  public key!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt!: Date;

}
