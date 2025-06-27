export interface UserInterface {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export interface PurchaseInfoByUser extends UserInterface {
  deliveryAddress: string;
  purchaseDate: Date;
}
