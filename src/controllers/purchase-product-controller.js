import { PurchaseProductRepository } from "../repositories/purchase-product-repository.js";

export class PurchaseProductController {
  async createPurchaseProduct(purchaseId, productId, productAmmount) {
    const values = [purchaseId, productId, productAmmount];

    return await new PurchaseProductRepository().createPurchaseProduct(values);
  }
}
