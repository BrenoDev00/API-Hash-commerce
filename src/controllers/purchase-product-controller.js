import { PurchaseProductRepository } from "../repositories/purchase-product-repository.js";

export class PurchaseProductController {
  async createPurchaseProduct(purchaseId, productId, productAmmount) {
    const values = [purchaseId, productId, productAmmount];

    return await new PurchaseProductRepository().createPurchaseProduct(values);
  }

  async updatePurchaseProductByPurchaseId(productAmmount, purchaseId) {
    return await new PurchaseProductRepository().updatePurchaseProductByPurchaseId(
      productAmmount,
      purchaseId
    );
  }

  async deletePurchaseProductByPurchaseId(purchaseId) {
    return await new PurchaseProductRepository().deletePurchaseProductByPurchaseId(
      purchaseId
    );
  }
}
