import { QueryResult, QueryResultRow } from "pg";

export interface BaseRepositoryInterface {
  getAll<T>(table: string, columns: string[]): Promise<T[]>;

  getById<T>(table: string, id: string, columns: string[]): Promise<T[]>;

  getWithJoin<T>(
    leftTable: string,
    rightTable: string,
    columns: string[],
    joinType: string,
    leftTableId: string,
    rightTableId: string
  ): Promise<T[]>;

  createData(table: string, values: string[], columns: string[]): Promise<void>;

  createDataWithReturn(
    table: string,
    values: string[],
    columns: string[],
    returningColumn: string
  ): Promise<QueryResultRow>;

  updateById(
    table: string,
    id: string,
    values: string[],
    columns: string[]
  ): Promise<void>;

  updateByIdWithReturn(
    table: string,
    id: string,
    values: string[],
    columns: string[],
    returningColumn: string
  ): Promise<QueryResultRow>;

  updateWhere(
    table: string,
    values: string[],
    columns: string[],
    conditionColumn: string,
    conditionColumnValue: string
  ): Promise<void>;

  deleteById(table: string, id: string): Promise<QueryResultRow>;

  deleteWhere(
    table: string,
    conditionColumn: string,
    value: string
  ): Promise<QueryResult>;
}
