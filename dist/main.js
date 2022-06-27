"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT');
    const documentConfig = new swagger_1.DocumentBuilder()
        .setTitle('Marketplace API')
        .setDescription('The marketplace API description for documentation of API')
        .setVersion('1.0')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, documentConfig);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map