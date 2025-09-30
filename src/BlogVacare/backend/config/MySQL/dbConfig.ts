import dotenv from 'dotenv';
import path from 'path';

// Chargement de .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const dbConfig = {
  host: process.env.MYSQL_DB_HOST || '127.0.0.1',
  user: process.env.MYSQL_DB_USER || 'root',
  password: process.env.MYSQL_DB_PASSWORD || '',
  database: process.env.MYSQL_DB_NAME || 'blogvacare',
  port: Number(process.env.MYSQL_DB_PORT) || 3306,
};
