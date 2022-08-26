import {
  Body, Controller, Delete, Get,
  HttpCode,
  HttpStatus, Patch, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import type { UpdateResponse } from '../../../@types';
import { UpdateUserDto } from '../dtos';
import { User } from '../entities';
import UserService from '../services/user.service.abstract';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('profile')
  public findOne(@UserDecorator() user: User): Promise<User> {
    return this.userService.findOneUser(user.id);
  }

  // FOR ADMIN
  @Get('profiles')
  public findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @Patch('profile')
  public update(@UserDecorator() user: User, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    return this.userService.updateOneUser(user, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete('profile')
  public remove(@UserDecorator() user: User): Promise<void> {
    return this.userService.deleteOneUser(user);
  }

}
