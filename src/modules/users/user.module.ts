import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository, UserRepositoryFactory } from './repositories/user.repository';
import { UserServiceImpl } from './services/user.service';
import UserService from './services/user.service.abstract';

const userService: Provider = { provide: UserService, useClass: UserServiceImpl };

const userRepository: Provider = {
  provide: UserRepository,
  useFactory: UserRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [],
  exports: [userService],
  controllers: [UserController],
  providers: [userService, userRepository],
})
export class UserModule { }
