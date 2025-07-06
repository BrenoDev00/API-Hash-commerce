import { PurchaseProductRepository } from "../repositories/purchase-product-repository.js";
import { PurchaseProductControllerInterface } from "../types/index.js";

export class PurchaseProductController
  implements PurchaseProductControllerInterface
{
  async createPurchaseProduct(
    purchaseId: string,
    productId: string,
    productAmmount: number
  ): Promise<void> {
    const values: (string | number)[] = [purchaseId, productId, productAmmount];

    return await new PurchaseProductRepository().createPurchaseProduct(values);
  }

  async updatePurchaseProductByPurchaseId(
    productAmmount: number,
    purchaseId: string
  ): Promise<void> {
    return await new PurchaseProductRepository().updatePurchaseProductByPurchaseId(
      productAmmount,
      purchaseId
    );
  }

  async deletePurchaseProductByPurchaseId(purchaseId: string): Promise<void> {
    return await new PurchaseProductRepository().deletePurchaseProductByPurchaseId(
      purchaseId
    );
  }
}
