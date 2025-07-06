import { BaseRepository } from "./base-repository.js";
import { PurchaseListInterface } from "../types/index.js";
import { QueryResult, QueryResultRow } from "pg";

export class PurchaseRepository extends BaseRepository {
  async getPurchases(): Promise<PurchaseListInterface[]> {
    try {
      return await super.getAll<PurchaseListInterface>("purchases", [
        "id",
        "purchase_date",
        "delivery_address",
        "user_id",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getPurchaseById(id: string): Promise<PurchaseListInterface[]> {
    try {
      return await super.getById<PurchaseListInterface>("purchases", id, [
        "id",
        "purchase_date",
        "delivery_address",
        "user_id",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async createPurchase(purchaseValues: string[]): Promise<QueryResultRow> {
    try {
      return await super.createDataWithReturn(
        "purchases",
        purchaseValues,
        ["delivery_address", "user_id"],
        "id"
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePurchaseById(
    id: string,
    values: string[]
  ): Promise<QueryResultRow> {
    try {
      return await super.updateByIdWithReturn(
        "purchases",
        id,
        values,
        ["delivery_address"],
        "id"
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePurchaseById(id: string): Promise<QueryResult> {
    try {
      return await super.deleteById("purchases", id);
    } catch (error) {
      throw error;
    }
  }
}
