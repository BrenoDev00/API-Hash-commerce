import { QueryResult } from "pg";

export interface PurchaseProductControllerInterface {
  createPurchaseProduct(
    purchaseId: string,
    productId: string,
    productAmmount: string
  ): Promise<void>;

  updatePurchaseProductByPurchaseId(
    productAmmount: string[],
    purchaseId: string
  ): Promise<void>;

  deletePurchaseProductByPurchaseId(purchaseId: string): Promise<QueryResult>;
}
