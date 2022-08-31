import * as bcrypt from 'bcrypt';
import type { DataSource } from 'typeorm';
import type { RegisterDto } from '../../auth/dtos';
import type { UpdateUserDto } from '../dtos';
import { User } from '../entities';
import type { IUserRepository } from '../interfaces';

export const UserRepository = Symbol('USER_REPOSITORY');

export const UserRepositoryFactory = (dataSource: DataSource): IUserRepository =>
  dataSource.getRepository(User).extend({
    async createOne(registerDto: RegisterDto): Promise<User> {
      const user = await this.create(registerDto);

      return await this.save(user);
    },

    async updateOne(user: User, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
      const mergedUser = await this.merge(user, updateUserDto);

      if (updateUserDto.password) {
        const hashSalt = await bcrypt.genSalt();

        mergedUser.password = await bcrypt.hash(updateUserDto.password, hashSalt);
      }

      const { id, updatedAt } = await this.save(mergedUser);
      return { message: 'User was updated successfully', id, updatedAt: updatedAt?.toISOString() };
    },
  });
