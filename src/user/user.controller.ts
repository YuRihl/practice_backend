import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guard';
import { UserDecorator } from 'src/auth/decorator';

@Controller('users')
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
  update(
    @UserDecorator('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The user was deleted successfully',
    type: User,
  })
  @UseGuards(JwtGuard)
  @Delete('profile')
  remove(@UserDecorator('id') id: number) {
    return this.userService.remove(id);
  }
}
