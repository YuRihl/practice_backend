"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/**/migration/*.js'],
    migrationsTableName: 'typeorm_migrations',
    logging: true,
    synchronize: false,
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map