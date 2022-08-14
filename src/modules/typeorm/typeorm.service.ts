import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

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
      entities: ['dist/**/entities/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'typeorm_migrations',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    };
  }

}
