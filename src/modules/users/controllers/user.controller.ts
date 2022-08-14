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
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '../entities';
import { JwtGuard } from '../../../@framework/guards';
import { UserDecorator } from '../../../@framework/decorators';
import IUserService from '../services/user.service.abstract';

@Controller('user')
export class UserController {

  constructor(private readonly userService: IUserService) { }

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('profile')
  public findOne(@UserDecorator() user: User): User {
    return this.userService.findOne(user);
  }

  // FOR ADMIN
  @ApiOkResponse()
  @Get('profiles')
  public findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch('profile')
  public update(@UserDecorator() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(user, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The user was deleted successfully',
    type: User,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete('profile')
  public remove(@UserDecorator() user: User): Promise<{ message: string }> {
    return this.userService.remove(user);
  }

}
