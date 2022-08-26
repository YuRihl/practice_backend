import type { Repository } from 'typeorm';
import type { Photo } from '../entities';

interface CustomRepository {
  createOne(type: string, size: number): Promise<Photo>;
  updateOne(photo: Photo, path: string, key: string): Promise<Photo>;

}

type IPhotoRepository = CustomRepository & Repository<Photo>

export type { IPhotoRepository };
