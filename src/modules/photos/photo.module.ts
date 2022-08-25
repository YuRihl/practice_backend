import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { PhotoServiceImpl } from './services/photo.service';
import { PhotoController } from './controllers/photo.controller';
import PhotoService from './services/photo.service.abstract';
import { PhotoRepository, PhotoRepositoryFactory } from './repositories/photo.repository';
import { UserModule } from '../users/user.module';
import { ProductModule } from '../products/product.module';
import { CategoryModule } from '../categories/category.module';

const photoService: Provider = { provide: PhotoService, useClass: PhotoServiceImpl };

const photoRepository: Provider = {
  provide: PhotoRepository,
  useFactory: PhotoRepositoryFactory,
  inject: ['DATA_SOURCE'],
};

@Module({
  imports: [UserModule, ProductModule, CategoryModule],
  controllers: [PhotoController],
  providers: [photoService, photoRepository],
})
export class PhotoModule { }
