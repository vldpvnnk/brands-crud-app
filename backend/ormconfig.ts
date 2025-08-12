import { DataSource } from 'typeorm';
import { Brand } from './src/brands/brand.entity';
import { User } from './src/users/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'brands',
  entities: [Brand, User],
  synchronize: true,
});
