import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const documentConfig = new DocumentBuilder().build();

  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port);
}
bootstrap();
