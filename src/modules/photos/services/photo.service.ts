import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    try {
      const photo = await this.photoRepository.findById(id);
      if (!photo) throw new NotFoundException('Photo with given ID was not found');

      return photo;
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async createUserPhoto(userId: number, buffer: Buffer, size: number, mimetype: string): Promise<Photo> {
    try {
      const photo = await this.photoRepository.createOne(mimetype, size);

      const { Key, Location } = await this.uploadS3(buffer, `${userId}/${photo.id}`, mimetype);

      return this.photoRepository.updateOne(photo, Location, Key);
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

  public async uploadS3(photoBuffer: Buffer, key: string, type: string): Promise<S3.ManagedUpload.SendData> {
    try {
      const params: S3.PutObjectRequest = {
        Bucket: this.configService.get<string>('AWS_BUCKET') as string,
        Body: photoBuffer,
        Key: key,
        ContentType: type,
      };

      return await this.s3.upload(params).promise();
    } catch (error) {
      throw error instanceof HttpException ? error : new InternalServerErrorException((error as Error).message);
    }
  }

}
