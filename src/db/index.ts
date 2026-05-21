import { Pool } from "pg";
import config from "../config";

const pool = new Pool({ connectionString: config.CONNECTION_STRING });
const initDB = async () => {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(30) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(10) DEFAULT 'contributor',
                
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )  
    `);
  await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
         id SERIAL PRIMARY KEY,
         title VARCHAR(150) NOT NULL,
         description TEXT NOT NULL
         CHECK (LENGTH(description) >=20),
         type TEXT,
         status VARCHAR(20) DEFAULT 'open',
         reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()
      )  
    `);
};
export default initDB;
