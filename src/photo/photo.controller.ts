import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  ParseIntPipe,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'typeorm/platform/PlatformTools';
import { Response } from 'express';
import type { Photo } from './entities';

@Controller('photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotoController {

  constructor(private readonly photoService: PhotoService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async create(@UploadedFile() file: Express.Multer.File): Promise<Photo> {
    return this.photoService.create(file.buffer, file.originalname);
  }

  @Get('product/:id')
  public async findProductPhoto(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photoService.findProductPhoto(id);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  @Get('category/:id')
  public async findCategoryPhoto(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photoService.findCategoryPhoto(id);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  @Get('productInfo/:id/:photoNumber')
  public async findProductInfoPhoto(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoNumber', ParseIntPipe) photoNumber: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photoService.findProductInfoPhoto(id, photoNumber);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

}
