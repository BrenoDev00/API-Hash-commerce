export interface PurchaseInterface {
  id: string;
  purchaseDate: string;
  deliveryAddress: string;
}

export interface PurchaseListInterface extends PurchaseInterface {
  userId: string;
}

export interface CreatePurchaseInterface
  extends Pick<PurchaseListInterface, "deliveryAddress" | "userId"> {}
