import { BaseRepository } from "./base-repository.js";

export class UserRepository extends BaseRepository {
  async getUsers() {
    try {
      return await super.getAll("users", ["id", "name", "surname", "email"]);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await super.getById("users", id, [
        "id",
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getPurchaseInfoByUser() {
    try {
      return await super.getWithJoin(
        "purchases",
        "users",
        [
          "users.id",
          "users.name",
          "users.surname",
          "users.email",
          "purchases.delivery_address",
          "purchases.purchase_date",
        ],
        "INNER JOIN",
        "purchases.user_id",
        "users.id"
      );
    } catch (error) {
      throw error;
    }
  }

  async createUser(values) {
    try {
      return await super.createData("users", values, [
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(id, values) {
    try {
      return await super.updateById("users", id, values, [
        "name",
        "surname",
        "email",
      ]);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id) {
    try {
      return await super.deleteById("users", id);
    } catch (error) {
      throw error;
    }
  }
}
