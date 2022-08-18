import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartItemModule } from './modules/cart/cart-item.module';
import { PhotoModule } from './modules/photos/photo.module';
import { CategoryModule } from './modules/categories/category.module';
import { OrderModule } from './modules/orders/order.module';
import { configModuleConfig } from './config/module-configs/config.module.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot(configModuleConfig),
    ProductModule,
    UserModule,
    AuthModule,
    CartItemModule,
    PhotoModule,
    CategoryModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'DATA_SOURCE',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<DataSource> => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_NAME'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          entities: ['dist/**/entities/*.entity.js'],
          migrations: ['dist/migrations/*.js'],
          migrationsTableName: 'typeorm_migrations',
          logging: true,
          synchronize: true,
        });

        return dataSource.initialize();
      },
    },
  ],
})
export class AppModule { }
