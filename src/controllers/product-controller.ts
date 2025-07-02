import { ProductRepository } from "../repositories/product-repository.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import { productSchema } from "../schemas/product-schema.js";
import { INTERNAL_ERROR_MESSAGE } from "../utils/index.js";
import {
  ProductControllerInterface,
  ProductInterface,
  ResponseMessageInterface,
  StatusCodeEnum,
} from "../types/index.js";
import { Request, Response } from "express";

export class ProductController implements ProductControllerInterface {
  async getProducts(
    _request: Request,
    response: Response<ResponseMessageInterface | ProductInterface[]>
  ): Promise<Response<ResponseMessageInterface | ProductInterface[]>> {
    try {
      const result: ProductInterface[] =
        await new ProductRepository().getProducts();

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async getProductById(
    request: Request<{ id: string }>,
    response: Response<ResponseMessageInterface | ProductInterface[]>
  ): Promise<Response<ResponseMessageInterface | ProductInterface[]>> {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success) {
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: validation.error.errors });
    }

    try {
      const result: ProductInterface[] =
        await new ProductRepository().getProductById(id);

      if (!result.length)
        return response
          .status(StatusCodeEnum.NotFound)
          .send({ message: "Produto não encontrado." });

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async createProduct(request, response) {
    const { body } = request;

    const validation = productSchema.safeParse(body);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const productColumns = ["name", "price_in_cents", "size"];

    const values = productColumns.reduce((acc, columnName) => {
      acc.push(body[columnName]);

      return acc;
    }, []);

    await new ProductRepository().createProduct(values);

    return response
      .status(201)
      .send({ message: "Produto criado com sucesso!" });
  }

  async updateProductById(request, response) {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedProduct = await new ProductRepository().getProductById(id);

    if (!searchedProduct.length)
      return response.status(404).send({ message: "Produto não encontrado." });

    const bodyValidation = productSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const columns = ["name", "price_in_cents", "size"];

    const values = columns.map((column) => body[column]);

    await new ProductRepository().updateProductById(id, values);

    return response
      .status(200)
      .send({ message: "Produto editado com sucesso!" });
  }

  async deleteProductById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const searchedProduct = await new ProductRepository().getProductById(id);

    if (!searchedProduct.length)
      return response.status(404).send({ message: "Produto não encontrado." });

    await new ProductRepository().deleteProductById(id);

    return response
      .status(200)
      .send({ message: "Produto excluído com sucesso!" });
  }
}
