import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmService } from './modules/typeorm/typeorm.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartItemModule } from './modules/cart/cart-item.module';
import { PhotoModule } from './modules/photos/photo.module';
import { CategoryModule } from './modules/categories/category.module';
import { OrderModule } from './modules/orders/order.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    ConfigModule.forRoot({
      envFilePath: 'src/config/.env',
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
    CategoryModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
