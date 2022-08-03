import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities';

@Injectable()
export class PhotoService {

  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  public async create(dataBuffer: Buffer, filename: string): Promise<Photo> {
    const newPhoto = await this.photoRepository.create({
      name: filename,
      data: dataBuffer,
    });

    const photo = await this.photoRepository.save(newPhoto);
    return photo;
  }

  public async findProductPhoto(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({
      where: {
        product: {
          id,
        },
      },
    });

    if (!photo) {
      throw new NotFoundException();
    }

    return photo;
  }

  public async findCategoryPhoto(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({
      where: {
        category: {
          id,
        },
      },
    });

    if (!photo) {
      throw new NotFoundException();
    }

    return photo;
  }

  public async findProductInfoPhoto(id: number, photoNumber: number): Promise<Photo> {
    if (photoNumber <= 0) throw new BadRequestException();

    const photo = await this.photoRepository.find({
      where: {
        productInfo: {
          id,
        },
      },
    });

    if (photo.length === 0 || photoNumber > photo.length) {
      throw new NotFoundException();
    }

    return photo[photoNumber - 1] as Photo;
  }

}
