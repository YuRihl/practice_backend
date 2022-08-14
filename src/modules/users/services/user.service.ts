import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';
import { CartItem } from '../../cart/entities';
import type IUserService from './user.service.abstract';

@Injectable()
export class UserService implements IUserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CartItem) private cartRepository: Repository<CartItem>,
  ) { }

  public findOne(user: User): User {
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (!users.length) throw new NotFoundException();

    return users;
  }

  public async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {

    for (const key in updateUserDto) {
      const userKey: keyof UpdateUserDto = key as keyof UpdateUserDto;

      user[userKey] = updateUserDto[userKey] ?? user[userKey];
    }

    if (updateUserDto.password) {
      const hashSalt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(updateUserDto.password, hashSalt);
    }

    return await this.userRepository.save(user);
  }

  public async remove(user: User): Promise<{ message: string }> {
    const userCart = await this.cartRepository.findBy({
      user: { id: user.id },
    });

    await this.cartRepository.remove(userCart);

    const { firstName, secondName }: User =
      await this.userRepository.remove(user);

    return { message: `User ${firstName} ${secondName} was deleted successfully` };
  }

}
