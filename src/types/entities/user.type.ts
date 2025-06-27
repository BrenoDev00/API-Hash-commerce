export interface UserInterface {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export interface PurchaseInfoByUserInterface extends UserInterface {
  deliveryAddress: string;
  purchaseDate: Date;
}
