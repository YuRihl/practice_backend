import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { CartItem } from '../cart/entities';
import IUserService from './services/user.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([User, CartItem])],
  controllers: [UserController],
  providers: [{
    provide: IUserService,
    useClass: UserService,
  }],
  exports: [{
    provide: IUserService,
    useClass: UserService,
  }],
})
export class UserModule { }
