import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

/**
 * Interface de données du pool MySQL
 */
interface IDbPoolMySQLConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

/**
 * Classe d'instance singleton de données de configuration de MySQL (récupération unique du dotenv)
 */
class DbPoolMySQL {
    private static instance : IDbPoolMySQLConfig|null = null;

    private constructor() {}

    public static getInstance() : IDbPoolMySQLConfig {
        if (!DbPoolMySQL.instance) {

            DbPoolMySQL.instance = {
                host: process.env.DB_HOST || '127.0.0.1',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'blogvacare',
                port: Number(process.env.DB_PORT) || 3306
            };
        }

        return DbPoolMySQL.instance;
    }
}


/**
 * Méthode de récupération d'une liaison MySQL
 * @returns 
 */
export function getDbPool(): mysql.Pool {
    if (!pool) {
        const config = DbPoolMySQL.getInstance();
        pool = mysql.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true
        });
    }
    return pool;
}