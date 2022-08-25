import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { DataSource } from 'typeorm';
import type { UpdateResponse } from 'src/@types';
import type { UpdateUserDto } from '../dtos';
import { User } from '../entities';
import type { IUserRepository } from '../interfaces';
import type { RegisterDto } from 'src/modules/auth/dtos';

export const UserRepository = Symbol('USER_REPOSITORY');

export const UserRepositoryFactory = (dataSource: DataSource): IUserRepository =>
  dataSource.getRepository(User).extend({
    async findAll(): Promise<User[]> {
      try {
        return await this.find();
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async findOneBy(idOrEmail: number | string): Promise<User | null> {
      try {
        if (typeof idOrEmail === 'number') {
          return await this.findOneById({ id: idOrEmail });
        }

        return await this.findOne({ where: { email: idOrEmail } });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async createOne(registerDto: RegisterDto): Promise<User> {
      try {
        const user = await this.create(registerDto);

        return await this.save(user);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async updateOne(user: User, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
      try {
        const mergedUser = await this.merge(user, updateUserDto);

        if (updateUserDto.password) {
          const hashSalt = await bcrypt.genSalt();

          mergedUser.password = await bcrypt.hash(updateUserDto.password, hashSalt);
        }

        const { id, updatedAt } = await this.save(mergedUser);
        return { message: 'User was updated successfully', id, updatedAt: updatedAt.toISOString() };
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async deleteOne(user: User): Promise<void> {
      try {
        await this.remove(user);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },
  });
