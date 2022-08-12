import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import type { Photo } from '../entities';
import { PhotoService } from '../services/photo.service';

@Controller('photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotoController {

  constructor(private readonly photoService: PhotoService) { }

  @Get('product/:id')
  public async findProductPhoto(): Promise<Photo> {
    return await this.photoService.findProductPhoto(1);
  }

}
