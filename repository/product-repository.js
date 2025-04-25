import { BaseRepository } from "./base-repository.js";

export class ProductRepository extends BaseRepository {
  async getProducts() {
    try {
      return await super.getAll("products");
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await super.getById("products", id);
    } catch (error) {
      throw error;
    }
  }
}
