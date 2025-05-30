import { BaseRepository } from "./base-repository.js";

export class PurchaseProductRepository extends BaseRepository {
  async createPurchaseProduct(values) {
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
}
