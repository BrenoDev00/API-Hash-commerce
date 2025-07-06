import { QueryResult } from "pg";
import { BaseRepository } from "./base-repository.js";

export class PurchaseProductRepository extends BaseRepository {
  async createPurchaseProduct(values: string[]): Promise<void> {
    try {
      return await super.createData("purchases_products", values, [
        "purchase_id",
        "product_id",
        "product_ammount",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updatePurchaseProductByPurchaseId(
    value: string[],
    purchaseId: string
  ): Promise<void> {
    try {
      return await super.updateWhere(
        "purchases_products",
        value,
        ["product_ammount"],
        "purchase_id",
        purchaseId
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePurchaseProductByPurchaseId(id: string): Promise<QueryResult> {
    try {
      return super.deleteWhere("purchases_products", "purchase_id", id);
    } catch (error) {
      throw error;
    }
  }
}
