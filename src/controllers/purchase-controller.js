import { PurchaseRepository } from "../repositories/purchase-repository.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import {
  purchaseSchema,
  updatePurchaseSchema,
} from "../schemas/purchase-schema.js";

export class PurchaseController {
  async getPurchases(request, response) {
    const result = await new PurchaseRepository().getPurchases();

    return response.status(200).send(result);
  }

  async getPurchaseById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const result = await new PurchaseRepository().getPurchaseById(id);

    if (!result.length)
      return response.status(404).send({ message: "Compra não encontrada." });

    return response.status(200).send(result);
  }

  async createPurchase(request, response) {
    const { body } = request;

    const validation = purchaseSchema.safeParse(body);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const purchaseColumns = ["delivery_address", "user_id"];

    const values = purchaseColumns.reduce((acc, columnName) => {
      acc.push(body[columnName]);

      return acc;
    }, []);

    await new PurchaseRepository().createPurchase(values);

    return response
      .status(201)
      .send({ message: "Compra adicionada com sucesso!" });
  }

  async updatePurchaseById(request, response) {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedProduct = await new PurchaseRepository().getPurchaseById(id);

    if (!searchedProduct.length)
      return response.status(404).send({ message: "Compra não encontrada." });

    const bodyValidation = updatePurchaseSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const columns = ["delivery_address"];

    const values = columns.map((column) => body[column]);

    await new PurchaseRepository().updatePurchaseById(id, values);

    return response
      .status(200)
      .send({ message: "Compra editada com sucesso!" });
  }

  async deletePurchaseById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const searchedPurchase = await new PurchaseRepository().getPurchaseById(id);

    if (!searchedPurchase.length)
      return response.status(404).send({ message: "Compra não encontrada." });

    await new PurchaseRepository().deletePurchaseById(id);

    return response
      .status(200)
      .send({ message: "Compra excluída com sucesso!" });
  }
}
