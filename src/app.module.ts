import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmService } from './typeorm/typeorm.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { PhotoModule } from './photo/photo.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_TYPE: Joi.valid(
          'mysql',
          'postgres',
          'cockroachdb',
          'mariadb',
          'sqlite',
          'mssql',
          'mongodb',
        ).default('postgres'),
        DB_VERSION: Joi.valid(Joi.number(), 'latest').default('latest'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_NAME: Joi.string(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        PGADMIN_EMAIL: Joi.string().email(),
        PGADMIN_PASSWORD: Joi.string(),
        PGADMIN_PORT: Joi.number().default(5050),
      }),
    }),
    ProductModule,
    UserModule,
    AuthModule,
    CartItemModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
