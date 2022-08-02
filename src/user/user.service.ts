import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import type { ReturnUserDto } from './dto/return-user.dto';
import { CartItem } from 'src/cart-item/entities';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CartItem) private cartRepository: Repository<CartItem>,
  ) { }

  public async findOne(user: User): Promise<ReturnUserDto> {
    const { email, firstName, secondName, createdAt } = user;
    return await { email, firstName, secondName, createdAt };
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async update(user: User, updateUserDto: UpdateUserDto): Promise<ReturnUserDto> {

    for (const key in updateUserDto) {
      const userKey: keyof UpdateUserDto = key as keyof UpdateUserDto;

      user[userKey] = updateUserDto[userKey] ?? user[userKey];
    }

    if (updateUserDto.password) {
      const hashSalt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(updateUserDto.password, hashSalt);
    }

    await this.userRepository.save(user);

    const { email, firstName, secondName, updatedAt } =
      await this.userRepository.findOneBy({ id: user.id }) as User;

    return { email, firstName, secondName, updatedAt };
  }

  public async remove(user: User): Promise<{ message: string }> {
    const userCart = await this.cartRepository.findBy({
      user: { id: user.id },
    });

    await this.cartRepository.remove(userCart);

    const { firstName, secondName }: ReturnUserDto =
      await this.userRepository.remove(user);

    return { message: `User ${firstName} ${secondName} was deleted successfully` };
  }

}
