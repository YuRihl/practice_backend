import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import type { Photo } from '../entities';
import IPhotoService from '../services/photo.service.abstract';

@Controller('photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotoController {

  constructor(private readonly photoService: IPhotoService) { }

  @Get('product/:id')
  public findProductPhoto(): Promise<Photo> {
    return this.photoService.findProductPhoto(1);
  }

}
