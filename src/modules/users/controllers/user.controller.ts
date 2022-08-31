import {
  Body, Controller, Delete, Get,
  HttpCode,
  HttpStatus, Patch, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles, UserDecorator } from '../../../@framework/decorators';
import { JwtGuard, RolesGuard } from '../../../@framework/guards';
import { UpdateUserDto, UserDto } from '../dtos';
import { User } from '../entities';
import { UserService } from '../services';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('profile')
  public async findOne(@UserDecorator() user: User): Promise<UserDto> {
    return UserDto.fromEntity(await this.userService.findOneUser(user.id));
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('profiles')
  public async findAll(): Promise<UserDto[]> {
    return UserDto.fromEntities(await this.userService.findAllUsers());
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
