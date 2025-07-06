import { QueryResult } from "pg";
import { PurchaseProductRepository } from "../repositories/purchase-product-repository.js";
import { PurchaseProductControllerInterface } from "../types/index.js";

export class PurchaseProductController
  implements PurchaseProductControllerInterface
{
  async createPurchaseProduct(
    purchaseId: string,
    productId: string,
    productAmmount: string
  ): Promise<void> {
    const values: string[] = [purchaseId, productId, productAmmount];

    return await new PurchaseProductRepository().createPurchaseProduct(values);
  }

  async updatePurchaseProductByPurchaseId(
    productAmmount: string[],
    purchaseId: string
  ): Promise<void> {
    return await new PurchaseProductRepository().updatePurchaseProductByPurchaseId(
      productAmmount,
      purchaseId
    );
  }

  async deletePurchaseProductByPurchaseId(
    purchaseId: string
  ): Promise<QueryResult> {
    return await new PurchaseProductRepository().deletePurchaseProductByPurchaseId(
      purchaseId
    );
  }
}
