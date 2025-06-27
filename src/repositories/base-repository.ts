import { pool } from "./data-base.js";
import { PoolClient, QueryResult, QueryResultRow } from "pg";
import { BaseRepositoryInterface } from "../types/repositories/index.js";
import camelcaseKeys from "camelcase-keys";

export abstract class BaseRepository implements BaseRepositoryInterface {
  async getAll<T>(table: string, columns: string[]): Promise<T[]> {
    try {
      const result = (
        await pool.query(`SELECT ${columns.join(", ")} FROM public.${table}`)
      ).rows;

      return camelcaseKeys(result, { deep: true });
    } catch (error) {
      throw error;
    }
  }

  async getById<T>(table: string, id: string, columns: string[]): Promise<T[]> {
    const query: string = `SELECT ${columns.join(
      ", "
    )} FROM public.${table} WHERE id = $1`;

    try {
      const result = (await pool.query(query, [id])).rows;

      return camelcaseKeys(result, { deep: true });
    } catch (error) {
      throw error;
    }
  }

  async getWithJoin<T>(
    leftTable: string,
    rightTable: string,
    columns: string[],
    joinType: string,
    leftTableId: string,
    rightTableId: string
  ): Promise<T[]> {
    const query: string = `SELECT public.${columns.join(
      ", "
    )} FROM public.${leftTable} ${joinType} ${rightTable} ON public.${leftTableId} = public.${rightTableId}`;

    try {
      const result = (await pool.query(query)).rows;

      return camelcaseKeys(result, { deep: true });
    } catch (error) {
      throw error;
    }
  }

  async createData(
    table: string,
    values: string[],
    columns: string[]
  ): Promise<void> {
    const poolConection: Promise<PoolClient> = pool.connect();

    try {
      const flags: number[] = Array.from(new Array(columns.length).keys());

      const formattedFlags: string[] = flags.map((flag) => `$${flag + 1}`);

      const query: string = `INSERT INTO public.${table} (${columns.join(
        ", "
      )}) VALUES (${formattedFlags.join(", ")})`;

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

  async createDataWithReturn(
    table: string,
    values: string[],
    columns: string[],
    returningColumn: string
  ): Promise<QueryResultRow> {
    const poolConection: Promise<PoolClient> = pool.connect();
    try {
      const flags: number[] = Array.from(new Array(columns.length).keys());

      const formattedFlags: string[] = flags.map((flag) => `$${flag + 1}`);

      const query: string = `INSERT INTO public.${table} (${columns.join(
        ", "
      )}) VALUES (${formattedFlags.join(", ")}) RETURNING ${returningColumn}`;

      (await poolConection).query("BEGIN TRANSACTION");

      const result: Promise<QueryResult<QueryResultRow>> = (
        await poolConection
      ).query(query, values);

      (await poolConection).query("COMMIT");

      return (await result).rows[0][returningColumn];
    } catch (error) {
      (await poolConection).query("ROLLBACK");
      throw error;
    } finally {
      (await poolConection).release();
    }
  }

  async updateById(
    table: string,
    id: string,
    values: string[],
    columns: string[]
  ): Promise<void> {
    const poolConection: Promise<PoolClient> = pool.connect();

    try {
      const setColumns: string = columns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");

      const query: string = `UPDATE public.${table} SET ${setColumns} WHERE id = $${
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

  async updateByIdWithReturn(
    table: string,
    id: string,
    values: string[],
    columns: string[],
    returningColumn: string
  ): Promise<QueryResultRow> {
    const poolConection: Promise<PoolClient> = pool.connect();

    try {
      const setColumns: string = columns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");

      const query: string = `UPDATE public.${table} SET ${setColumns} WHERE id = $${
        columns.length + 1
      } RETURNING ${returningColumn}`;

      (await poolConection).query("BEGIN TRANSACTION");

      const result: Promise<QueryResult<QueryResultRow>> = (
        await poolConection
      ).query(query, [...values, id]);

      (await poolConection).query("COMMIT");

      return (await result).rows[0][returningColumn];
    } catch (error) {
      (await poolConection).query("ROLLBACK");
      throw error;
    } finally {
      (await poolConection).release();
    }
  }

  async updateWhere(
    table: string,
    values: string[],
    columns: string[],
    conditionColumn: string,
    conditionColumnValue: string
  ): Promise<void> {
    const poolConection: Promise<PoolClient> = pool.connect();

    try {
      const setColumns: string = columns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");

      const query: string = `UPDATE public.${table} SET ${setColumns} WHERE ${conditionColumn} = $${
        columns.length + 1
      }`;

      (await poolConection).query("BEGIN TRANSACTION");
      (await poolConection).query(query, [...values, conditionColumnValue]);
      (await poolConection).query("COMMIT");
    } catch (error) {
      (await poolConection).query("ROLLBACK");
      throw error;
    } finally {
      (await poolConection).release();
    }
  }

  async deleteById(table: string, id: string): Promise<QueryResult> {
    try {
      const query: string = `DELETE FROM public.${table} WHERE id = $1`;

      return await pool.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  async deleteWhere(
    table: string,
    conditionColumn: string,
    value: string
  ): Promise<QueryResult> {
    try {
      const query: string = `DELETE FROM public.${table} WHERE ${conditionColumn} = $1`;

      return await pool.query(query, [value]);
    } catch (error) {
      throw error;
    }
  }
}
