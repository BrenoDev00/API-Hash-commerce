import { PurchaseRepository } from "../repositories/purchase-repository.js";
import { ProductRepository } from "../repositories/product-repository.js";
import { UserRepository } from "../repositories/user-repository.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import {
  purchaseSchema,
  updatePurchaseSchema,
} from "../schemas/purchase-schema.js";
import { productAmmountSchema } from "../schemas/product-schema.js";
import { PurchaseProductController } from "./purchase-product-controller.js";
import {
  PurchaseControllerInterface,
  PurchaseListInterface,
  ResponseMessageInterface,
  StatusCodeEnum,
} from "../types/index.js";
import { INTERNAL_ERROR_MESSAGE } from "../utils/index.js";
import { Request, Response } from "express";

export class PurchaseController implements PurchaseControllerInterface {
  async getPurchases(
    _request: Request,
    response: Response<PurchaseListInterface[] | ResponseMessageInterface>
  ): Promise<Response<PurchaseListInterface[] | ResponseMessageInterface>> {
    try {
      const result: PurchaseListInterface[] =
        await new PurchaseRepository().getPurchases();

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async getPurchaseById(
    request: Request<{ id: string }>,
    response: Response<ResponseMessageInterface | PurchaseListInterface[]>
  ): Promise<Response<ResponseMessageInterface | PurchaseListInterface[]>> {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: validation.error.errors });

    try {
      const result: PurchaseListInterface[] =
        await new PurchaseRepository().getPurchaseById(id);

      if (!result.length)
        return response
          .status(StatusCodeEnum.NotFound)
          .send({ message: "Compra não encontrada." });

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  // async createPurchase(request, response) {
  //   const { body } = request;
  //   const { user_id } = body;
  //   const { productId, productAmmount } = request.params;

  //   const formattedProductAmmount = Number(productAmmount);

  //   const productIdValidation = uuidSchema.safeParse(productId);

  //   const productAmmountValidation = productAmmountSchema.safeParse(
  //     formattedProductAmmount
  //   );

  //   const bodyValidation = purchaseSchema.safeParse(body);

  //   if (!productIdValidation.success)
  //     return response.status(400).send(productIdValidation.error.errors);

  //   const searchedProductId = await new ProductRepository().getProductById(
  //     productId
  //   );

  //   if (!searchedProductId.length)
  //     return response
  //       .status(404)
  //       .send({ message: "id do produto não encontrado." });

  //   if (!productAmmountValidation.success)
  //     return response.status(400).send(productAmmountValidation.error.errors);

  //   if (!bodyValidation.success)
  //     return response.status(400).send(bodyValidation.error.errors);

  //   const searchedUserId = await new UserRepository().getUserById(user_id);

  //   if (!searchedUserId.length)
  //     return response
  //       .status(404)
  //       .send({ message: "id do usuário não encontrado." });

  //   const purchaseColumns = ["delivery_address", "user_id"];

  //   const values = purchaseColumns.reduce((acc, columnName) => {
  //     acc.push(body[columnName]);

  //     return acc;
  //   }, []);

  //   const purchaseId = await new PurchaseRepository().createPurchase(values);

  //   await new PurchaseProductController().createPurchaseProduct(
  //     purchaseId,
  //     productId,
  //     productAmmount
  //   );

  //   return response
  //     .status(201)
  //     .send({ message: "Compra adicionada com sucesso!" });
  // }

  // async updatePurchaseById(request, response) {
  //   const { id, productAmmount } = request.params;
  //   const { body } = request;

  //   const idValidation = uuidSchema.safeParse(id);

  //   const formattedProductAmmount = Number(productAmmount);

  //   const productAmmountValidation = productAmmountSchema.safeParse(
  //     formattedProductAmmount
  //   );

  //   if (!idValidation.success)
  //     return response.status(400).send(idValidation.error.errors);

  //   const searchedProduct = await new PurchaseRepository().getPurchaseById(id);

  //   if (!searchedProduct.length)
  //     return response.status(404).send({ message: "Compra não encontrada." });

  //   if (!productAmmountValidation.success)
  //     return response.status(400).send(productAmmountValidation.error.errors);

  //   const bodyValidation = updatePurchaseSchema.safeParse(body);

  //   if (!bodyValidation.success)
  //     return response.status(400).send(bodyValidation.error.errors);

  //   const columns = ["delivery_address"];

  //   const values = columns.map((column) => body[column]);

  //   const purchaseId = await new PurchaseRepository().updatePurchaseById(
  //     id,
  //     values
  //   );

  //   await new PurchaseProductController().updatePurchaseProductByPurchaseId(
  //     productAmmount,
  //     purchaseId
  //   );

  //   return response
  //     .status(200)
  //     .send({ message: "Compra editada com sucesso!" });
  // }

  // async deletePurchaseById(request, response) {
  //   const { id } = request.params;

  //   const validation = uuidSchema.safeParse(id);

  //   if (!validation.success)
  //     return response.status(400).send(validation.error.errors);

  //   const searchedPurchase = await new PurchaseRepository().getPurchaseById(id);

  //   if (!searchedPurchase.length)
  //     return response.status(404).send({ message: "Compra não encontrada." });

  //   await new PurchaseProductController().deletePurchaseProductByPurchaseId(id);

  //   await new PurchaseRepository().deletePurchaseById(id);

  //   return response
  //     .status(200)
  //     .send({ message: "Compra excluída com sucesso!" });
  // }
}
