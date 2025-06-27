import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/product-controller.js";

export const productRouter: Router = Router();

productRouter.get(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    await new ProductController().getProducts(request, response);
  }
);

productRouter.get(
  "/:id",
  async (request: Request, response: Response): Promise<void> => {
    await new ProductController().getProductById(request, response);
  }
);

productRouter.post(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    await new ProductController().createProduct(request, response);
  }
);

productRouter.put(
  "/:id",
  async (request: Request, response: Response): Promise<void> => {
    await new ProductController().updateProductById(request, response);
  }
);

productRouter.delete(
  "/:id",
  async (request: Request, response: Response): Promise<void> => {
    await new ProductController().deleteProductById(request, response);
  }
);
