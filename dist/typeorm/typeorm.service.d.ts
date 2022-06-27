import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
export declare class TypeOrmService implements TypeOrmOptionsFactory {
    private readonly config;
    constructor(config: ConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
