import type { DataSource } from 'typeorm';
import { Photo } from '../entities';
import type { IPhotoRepository } from '../interfaces';

export const PhotoRepository = Symbol('PHOTO_REPOSITORY');

export const PhotoRepositoryFactory = (dataSource: DataSource): IPhotoRepository =>
  dataSource.getRepository(Photo).extend({
    async createOne(type: string, size: number): Promise<Photo> {
      const photo = await this.create({ type, size });

      return await this.save(photo);
    },

    async updateOne(photo: Photo, path: string, key: string): Promise<Photo> {
      const mergedPhoto = await this.merge(photo, { path, key });

      return await this.save(mergedPhoto);
    },
  });
