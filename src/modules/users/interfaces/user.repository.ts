import type { UpdateResponse } from 'src/@types';
import type { RegisterDto } from '../../../modules/auth/dtos';
import type { Repository } from 'typeorm';
import type { UpdateUserDto } from '../dtos';
import type { User } from '../entities';

interface CustomRepository {
  findAll(): Promise<User[]>;
  findOneBy(idOrEmail: number | string): Promise<User | null>;
  createOne(registerDto: RegisterDto): Promise<User>;
  updateOne(user: User, updateUserDto: UpdateUserDto): Promise<UpdateResponse>;
  deleteOne(user: User): Promise<void>;
}

type IUserRepository = CustomRepository & Repository<User>;

export type { IUserRepository };
