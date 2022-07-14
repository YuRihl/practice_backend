import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import { ReturnUserDto } from './dto/return-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(user: User) {
    return user;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const hashSalt = await bcrypt.genSalt();

    user = {
      ...user,
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password, hashSalt),
    };

    const { email, firstName, secondName }: ReturnUserDto =
      await this.userRepository.save(user);

    return { email, firstName, secondName };
  }

  async remove(user: User) {
    const { email, firstName, secondName }: ReturnUserDto =
      await this.userRepository.remove(user);

    return { email, firstName, secondName };
  }
}
