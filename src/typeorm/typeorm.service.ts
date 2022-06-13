import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Category } from 'src/product/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      // __dirname + '/**/*.entity.{ts,js}'
      entities: [Product, Category, User],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
