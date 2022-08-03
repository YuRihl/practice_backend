import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartItem } from 'src/cart-item/entities';
import { Category } from 'src/category/entities/category.entity';
import { Photo } from 'src/photo/entities';
import { Product, ProductInfo } from 'src/product/entities';
import { User } from 'src/user/entities';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {

  constructor(@Inject(ConfigService) private readonly config: ConfigService) { }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      entities: [Product, Category, User, CartItem, ProductInfo, Photo],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  }

}
