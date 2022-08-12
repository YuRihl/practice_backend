import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartItem } from 'src/modules/cart/entities';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Photo } from 'src/modules/photos/entities';
import { Product, ProductCategory } from 'src/modules/products/entities';
import { User } from 'src/modules/users/entities';
import { Order, OrderItem } from '../orders/entities';

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
      entities: [Product, ProductCategory, Category, User, CartItem, Order, OrderItem, Photo],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  }

}
