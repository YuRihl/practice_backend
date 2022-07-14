import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  async create(dataBuffer: Buffer, filename: string) {
    const newFile = await this.photoRepository.create({
      name: filename,
      data: dataBuffer,
    });

    await this.photoRepository.save(newFile);
    return newFile;
  }

  async findProduct(id: number) {
    console.log(id);
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

  async findCategory(id: number) {
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

  async findProductInfo(id: number, photoNumber: number) {
    const photo = await this.photoRepository.find({
      where: {
        productInfo: {
          id,
        },
      },
    });

    if (!photo) {
      throw new NotFoundException();
    }

    return photo[photoNumber - 1];
  }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
