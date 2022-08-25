import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UpdateUserDto } from '../dtos/update-user.dto';
import type { User } from '../entities';
import { UserRepository } from '../repositories/user.repository';
import { IUserRepository } from '../interfaces';
import type { UpdateResponse } from '../../../@types';
import UserService from './user.service.abstract';
import type { RegisterDto } from 'src/modules/auth/dtos';

@Injectable()
export class UserServiceImpl extends UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {
    super();
  }

  public async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async findOneUser(idOrEmail: number | string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy(idOrEmail);

      if (!user)
        throw new NotFoundException(`User with given ${typeof idOrEmail === 'number' ? 'ID' : 'email'} was not found`);

      return user;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createOneUser(registerDto: RegisterDto): Promise<User> {
    try {
      const hashSalt = await bcrypt.genSalt();

      return await this.userRepository
        .createOne({ ...registerDto, password: await bcrypt.hash(registerDto.password, hashSalt) });
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async updateOneUser(user: User, updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    try {
      return await this.userRepository.updateOne(user, updateUserDto);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async deleteOneUser(user: User): Promise<void> {
    try {
      await this.userRepository.deleteOne(user);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

}
