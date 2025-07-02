export interface ProductInterface {
  id: string;
  name: string;
  priceInCents: string;
  size: string;
}

export interface CreateProductInterface extends Omit<ProductInterface, "id"> {}
