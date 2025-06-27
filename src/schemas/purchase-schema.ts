import { z } from "zod";
import { uuidSchema } from "./uuid-schema.js";

export const purchaseSchema = z.object({
  delivery_address: z.string().min(3),
  user_id: uuidSchema,
});

export const updatePurchaseSchema = z.object({
  delivery_address: z.string().min(3),
});
