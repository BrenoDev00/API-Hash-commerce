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

  async getPurchaseById(id) {
    try {
      return await super.getById("purchases", id, [
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

  async updatePurchaseById(id, values) {
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

  async deletePurchaseById(id) {
    try {
      return await super.deleteById("purchases", id);
    } catch (error) {
      throw error;
    }
  }
}
