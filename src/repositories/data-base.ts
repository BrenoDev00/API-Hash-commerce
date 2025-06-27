import pg, { Pool } from "pg";

export const pool: Pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
