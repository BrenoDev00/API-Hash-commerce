import { BaseRepository } from "./base-repository.js";

export class PurchaseRepository extends BaseRepository {
  async getPurchases() {
    try {
      return await super.getAll("purchases", [
        "id",
        "purchase_date",
        "delivery_address",
        "user_id",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async createPurchase(purchaseValues) {
    try {
      return await super.createData("purchases", purchaseValues, [
        "delivery_address",
        "user_id",
      ]);
    } catch (error) {
      throw error;
    }
  }

  
}
