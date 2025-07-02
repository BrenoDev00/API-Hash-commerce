import { BaseRepository } from "./base-repository.js";
import { ProductInterface } from "../types/entities/index.js";
import { QueryResult } from "pg";

export class ProductRepository extends BaseRepository {
  async getProducts(): Promise<ProductInterface[]> {
    try {
      return await super.getAll<ProductInterface>("products", [
        "id",
        "name",
        "price_in_cents",
        "size",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string): Promise<ProductInterface[]> {
    try {
      return await super.getById<ProductInterface>("products", id, [
        "id",
        "name",
        "price_in_cents",
        "size",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async createProduct(values: string[]): Promise<void> {
    try {
      return await super.createData("products", values, [
        "name",
        "price_in_cents",
        "size",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(id: string, values: string[]): Promise<void> {
    try {
      return await super.updateById("products", id, values, [
        "name",
        "price_in_cents",
        "size",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id: string): Promise<QueryResult> {
    try {
      return await super.deleteById("products", id);
    } catch (error) {
      throw error;
    }
  }
}
