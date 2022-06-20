import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(user: User) {
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({ id });

    const hashSalt = await bcrypt.genSalt();

    user = {
      ...user,
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password, hashSalt),
    };

    const savedUser = await this.userRepository.save(user);

    delete savedUser.password;

    return savedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const deletedUser = await this.userRepository.remove(user);

    delete deletedUser.password;

    return deletedUser;
  }
}
