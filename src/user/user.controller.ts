import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities';
import { JwtGuard } from 'src/auth/guard';
import { UserDecorator } from 'src/auth/decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'The user was found successfully',
    type: User,
  })
  @UseGuards(JwtGuard)
  @Get('profile')
  findOne(@UserDecorator() user: User) {
    return this.userService.findOne(user);
  }

  @ApiOkResponse({
    description: 'The user was updated successfully',
    type: User,
  })
  @UseGuards(JwtGuard)
  @Patch('profile')
  update(@UserDecorator() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The user was deleted successfully',
    type: User,
  })
  @UseGuards(JwtGuard)
  @Delete('profile')
  remove(@UserDecorator() user: User) {
    return this.userService.remove(user);
  }
}
