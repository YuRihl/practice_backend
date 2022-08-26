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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '../../users/entities';
import { UserDecorator } from '../../../@framework/decorators';
import { JwtGuard } from '../../../@framework/guards';
import type { Photo } from '../entities';
import PhotoService from '../services/photo.service.abstract';

@ApiTags('Photo')
@Controller('photos')
export class PhotoController {

  constructor(private readonly photoService: PhotoService) { }

  @Get(':id')
  public findOnePhoto(@Param('id', ParseIntPipe) id: number): Promise<Photo> {
    return this.photoService.findOnePhoto(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'User photo' })
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  public createUserPhoto(@UserDecorator() user: User, @UploadedFile() photo: Express.Multer.File): Promise<Photo> {
    return this.photoService.createUserPhoto(user.id, photo.buffer, photo.size, photo.mimetype);
  }

}
