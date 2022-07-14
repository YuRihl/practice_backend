import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@Controller('photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.photoService.create(file.buffer, file.originalname);
  }

  @Get('product/:id')
  async findProduct(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const photo = await this.photoService.findProduct(id);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  @Get('category/:id')
  async findCategory(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const photo = await this.photoService.findCategory(id);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  @Get('productInfo/:id/:photoNumber')
  async findProductInfo(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoNumber', ParseIntPipe) photoNumber: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const photo = await this.photoService.findProductInfo(id, photoNumber);

    const stream = Readable.from(photo.data);

    response.set({
      'Content-Disposition': `inline; filename="${photo.name}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photoService.update(+id, updatePhotoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
