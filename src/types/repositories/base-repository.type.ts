import { QueryResult, QueryResultRow } from "pg";

export interface BaseRepositoryInterface {
  getAll<T extends QueryResultRow>(
    table: string,
    columns: string[]
  ): Promise<QueryResult<T>[]>;

  getById<T extends QueryResultRow>(
    table: string,
    id: string,
    columns: string[]
  ): Promise<QueryResult<T>[]>;

  getWithJoin<T extends QueryResultRow>(
    leftTable: string,
    rightTable: string,
    columns: string[],
    joinType: string,
    leftTableId: string,
    rightTableId: string
  ): Promise<QueryResult<T>[]>;

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
