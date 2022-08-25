import {
  Controller,
  Body,
  Patch,
  Delete,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../entities';
import { JwtGuard } from '../../../@framework/guards';
import { UserDecorator } from '../../../@framework/decorators';
import type { UpdateResponse } from '../../../@types';
import UserService from '../services/user.service.abstract';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('profile')
  public findOne(@UserDecorator() user: User): Promise<User> {
    return this.userService.findOneUser(user.id);
  }

  // FOR ADMIN
  @ApiOkResponse()
  @Get('profiles')
  public findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch('profile')
  public update(@UserDecorator() user: User, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResponse> {
    return this.userService.updateOneUser(user, updateUserDto);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete('profile')
  public remove(@UserDecorator() user: User): void {
    this.userService.deleteOneUser(user);
  }

}
