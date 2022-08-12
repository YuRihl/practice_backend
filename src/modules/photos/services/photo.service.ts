import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entities';
import type IPhotoService from './photo.service.abstract';

@Injectable()
export class PhotoService implements IPhotoService {

  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  public async findProductPhoto(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { id } });

    if (!photo) throw new NotFoundException();

    return photo;
  }

}
