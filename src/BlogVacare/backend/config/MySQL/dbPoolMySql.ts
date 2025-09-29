import mysql from 'mysql2/promise';
import { dbConfig } from '@BlogsBack/config/MySQL/dbConfig';

let pool: mysql.Pool | null = null;

/**
 * Méthode de récupération d'une liaison MySQL
 * @returns 
 */
export function getDbPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            port: dbConfig.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    console.log(dbConfig);
    return pool;
}