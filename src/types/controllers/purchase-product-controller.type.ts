export interface PurchaseProductControllerInterface {
  createPurchaseProduct(
    purchaseId: string,
    productId: string,
    productAmmount: number
  ): Promise<void>;

  updatePurchaseProductByPurchaseId(
    productAmmount: number,
    purchaseId: string
  ): Promise<void>;

  deletePurchaseProductByPurchaseId(purchaseId: string): Promise<void>;
}
