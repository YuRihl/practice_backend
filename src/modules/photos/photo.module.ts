import { Module } from '@nestjs/common';
import { PhotoService } from './services/photo.service';
import { PhotoController } from './controllers/photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities';
import IPhotoService from './services/photo.service.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotoController],
  providers: [{
    provide: IPhotoService,
    useClass: PhotoService,
  }],
})
export class PhotoModule { }
