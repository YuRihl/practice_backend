import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import type { Photo } from '../entities';
import { IPhotoRepository } from '../interfaces';
import { PhotoRepository } from '../repositories/photo.repository';
import PhotoService from './photo.service.abstract';

@Injectable()
export class PhotoServiceImpl extends PhotoService {

  private s3 = new S3();

  constructor(
    @Inject(PhotoRepository) private photoRepository: IPhotoRepository,
    private readonly configService: ConfigService,
  ) { super(); }

  public async findOnePhoto(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOneById({ id });
    if (!photo) throw new NotFoundException('Photo with given ID was not found');

    return photo;
  }

  public async createUserPhoto(userId: number, buffer: Buffer, size: number, mimetype: string): Promise<Photo> {
    const photo = await this.photoRepository.createOne(mimetype, size);

    const { Key, Location } = await this.uploadS3(buffer, `${userId}/${photo.id}`, mimetype);

    return this.photoRepository.updateOne(photo, Location, Key);
  }

  public async uploadS3(photoBuffer: Buffer, key: string, type: string): Promise<S3.ManagedUpload.SendData> {
    const params: S3.PutObjectRequest = {
      Bucket: this.configService.get<string>('AWS_BUCKET') as string,
      Body: photoBuffer,
      Key: key,
      ContentType: type,
    };

    return await this.s3.upload(params).promise();
  }

}
