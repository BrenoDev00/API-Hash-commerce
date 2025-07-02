import { ProductRepository } from "../repositories/product-repository.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import { productSchema } from "../schemas/product-schema.js";
import { INTERNAL_ERROR_MESSAGE } from "../utils/index.js";
import snakecaseKeys from "snakecase-keys";
import {
  ProductControllerInterface,
  ProductInterface,
  CreateProductInterface,
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

  async createProduct(
    request: Request<{}, {}, CreateProductInterface>,
    response: Response<ResponseMessageInterface>
  ): Promise<Response<ResponseMessageInterface>> {
    const { body } = request;

    const validation = productSchema.safeParse(body);

    if (!validation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: validation.error.errors });

    const productColumns: (keyof CreateProductInterface)[] = [
      "name",
      "priceInCents",
      "size",
    ];

    const values: string[] = productColumns.reduce(
      (acc: string[], columnName) => {
        acc.push(body[columnName]);

        snakecaseKeys(body);

        return acc;
      },
      []
    );

    try {
      await new ProductRepository().createProduct(values);

      return response
        .status(StatusCodeEnum.Created)
        .send({ message: "Produto criado com sucesso!" });
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async updateProductById(
    request: Request<{ id: string }, {}, CreateProductInterface>,
    response: Response<ResponseMessageInterface>
  ): Promise<Response<ResponseMessageInterface>> {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: idValidation.error.errors });

    const searchedProduct: ProductInterface[] =
      await new ProductRepository().getProductById(id);

    if (!searchedProduct.length)
      return response
        .status(StatusCodeEnum.NotFound)
        .send({ message: "Produto não encontrado." });

    const bodyValidation = productSchema.safeParse(body);

    if (!bodyValidation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: bodyValidation.error.errors });

    const columns: (keyof CreateProductInterface)[] = [
      "name",
      "priceInCents",
      "size",
    ];

    const values: string[] = columns.map((column) => body[column]);

    try {
      await new ProductRepository().updateProductById(id, values);

      return response
        .status(StatusCodeEnum.Ok)
        .send({ message: "Produto editado com sucesso!" });
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  // async deleteProductById(request, response) {
  //   const { id } = request.params;

  //   const validation = uuidSchema.safeParse(id);

  //   if (!validation.success)
  //     return response.status(400).send(validation.error.errors);

  //   const searchedProduct = await new ProductRepository().getProductById(id);

  //   if (!searchedProduct.length)
  //     return response.status(404).send({ message: "Produto não encontrado." });

  //   await new ProductRepository().deleteProductById(id);

  //   return response
  //     .status(200)
  //     .send({ message: "Produto excluído com sucesso!" });
  // }
}
