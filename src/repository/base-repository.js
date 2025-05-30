import { pool } from "./data-base.js";

export class BaseRepository {
  async getAll(table, columns) {
    try {
      return (
        await pool.query(`SELECT ${columns.join(", ")} FROM public.${table}`)
      ).rows;
    } catch (error) {
      throw error;
    }
  }

  async getById(table, id, columns) {
    const query = `SELECT ${columns.join(
      ", "
    )} FROM public.${table} WHERE id = $1`;

    try {
      return (await pool.query(query, [id])).rows;
    } catch (error) {
      throw error;
    }
  }

  async createData(table, values, columns) {
    const poolConection = pool.connect();

    try {
      const flags = Array.from(new Array(columns.length).keys());

      const formatedFlags = flags.map((flag) => `$${flag + 1}`);

      const query = `INSERT INTO public.${table} (${columns.join(
        ", "
      )}) VALUES (${formatedFlags.join(", ")})`;

      (await poolConection).query("BEGIN TRANSACTION");
      (await poolConection).query(query, values);
      (await poolConection).query("COMMIT");
    } catch (error) {
      (await poolConection).query("ROLLBACK");
      throw error;
    } finally {
      (await poolConection).release();
    }
  }

  async updateById(table, id, values, columns) {
    const poolConection = pool.connect();

    try {
      const setColumns = columns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");

      const query = `UPDATE public.${table} SET ${setColumns} WHERE id = $${
        columns.length + 1
      }`;

      (await poolConection).query("BEGIN TRANSACTION");
      (await poolConection).query(query, [...values, id]);
      (await poolConection).query("COMMIT");
    } catch (error) {
      (await poolConection).query("ROLLBACK");
      throw error;
    } finally {
      (await poolConection).release();
    }
  }

  async deleteById(table, id) {
    try {
      const query = `DELETE FROM public.${table} WHERE id = $1`;

      return await pool.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
}
