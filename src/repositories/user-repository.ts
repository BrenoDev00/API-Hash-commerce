import { BaseRepository } from "./base-repository.js";
import { QueryResult } from "pg";
import { UserInterface, PurchaseInfoByUserInterface } from "../types/index.js";

export class UserRepository extends BaseRepository {
  async getUsers(): Promise<UserInterface[]> {
    try {
      return await super.getAll<UserInterface>("users", [
        "id",
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<UserInterface[]> {
    try {
      return await super.getById<UserInterface>("users", id, [
        "id",
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getPurchaseInfoByUser(): Promise<PurchaseInfoByUserInterface[]> {
    try {
      return await super.getWithJoin<PurchaseInfoByUserInterface>(
        "purchases",
        "users",
        [
          "users.id",
          "users.name",
          "users.surname",
          "users.email",
          "purchases.delivery_address",
          "purchases.purchase_date",
        ],
        "INNER JOIN",
        "purchases.user_id",
        "users.id"
      );
    } catch (error) {
      throw error;
    }
  }

  async createUser(values: string[]): Promise<void> {
    try {
      return await super.createData("users", values, [
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(id: string, values: string[]): Promise<void> {
    try {
      return await super.updateById("users", id, values, [
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id: string): Promise<QueryResult> {
    try {
      return await super.deleteById("users", id);
    } catch (error) {
      throw error;
    }
  }
}
