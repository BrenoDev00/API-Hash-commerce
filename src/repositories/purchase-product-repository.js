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

  async updatePurchaseProductByPurchaseId(value, purchaseId) {
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

  async deletePurchaseProductByPurchaseId(id) {
    try {
      return super.deleteWhere("purchases_products", "purchase_id", id);
    } catch (error) {
      throw error;
    }
  }
}
