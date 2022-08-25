import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../../users/entities';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import type { Photo } from '../entities';
import PhotoService from '../services/photo.service.abstract';

@Controller('photos')
export class PhotoController {

  constructor(private readonly photoService: PhotoService) { }

  @ApiOkResponse()
  @Get(':id')
  public findOnePhoto(@Param('id', ParseIntPipe) id: number): Promise<Photo> {
    return this.photoService.findOnePhoto(id);
  }

  @ApiCreatedResponse()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  public createUserPhoto(@UserDecorator() user: User, @UploadedFile() photo: Express.Multer.File): Promise<Photo> {
    return this.photoService.createUserPhoto(user.id, photo.buffer, photo.size, photo.mimetype);
  }

}
