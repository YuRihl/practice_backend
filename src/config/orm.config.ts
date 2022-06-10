import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yuri',
  password: 'dbyuripass',
  database: 'yuri',
  entities: ['../**/*.entity.ts'],
  synchronize: true,
  logging: true,
};

export default config;
