import { InternalServerErrorException } from '@nestjs/common';
import type { DataSource } from 'typeorm';
import { Photo } from '../entities';
import type { IPhotoRepository } from '../interfaces';

export const PhotoRepository = Symbol('PHOTO_REPOSITORY');

export const PhotoRepositoryFactory = (dataSource: DataSource): IPhotoRepository =>
  dataSource.getRepository(Photo).extend({
    async findById(id: number): Promise<Photo | null> {
      try {
        return await this.findOne({
          where: { id },
        });
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async createOne(type: string, size: number): Promise<Photo> {
      try {
        const photo = await this.create({ type, size });

        return await this.save(photo);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },

    async updateOne(photo: Photo, path: string, key: string): Promise<Photo> {
      try {
        const mergedPhoto = await this.merge(photo, { path, key });

        return await this.save(mergedPhoto);
      } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
      }
    },
  });
