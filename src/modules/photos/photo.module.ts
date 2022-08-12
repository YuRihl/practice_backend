import { Module } from '@nestjs/common';
import { PhotoService } from './services/photo.service';
import { PhotoController } from './controllers/photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule { }
