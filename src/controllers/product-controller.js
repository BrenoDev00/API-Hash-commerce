import { ProductRepository } from "../repositories/product-repository.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import { productSchema } from "../schemas/product-schema.js";

export class ProductController {
  async getProducts(request, response) {
    const result = await new ProductRepository().getProducts();

    return response.status(200).send(result);
  }

  async getProductById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success) {
      return response.status(400).send(validation.error.errors);
    }

    const result = await new ProductRepository().getProductById(id);

    if (!result.length)
      return response.status(404).send({ message: "Produto não encontrado." });

    return response.status(200).send(result);
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
