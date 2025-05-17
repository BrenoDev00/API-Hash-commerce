import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(120),
  price_in_cents: z.number().positive(),
  size: z.string(),
});
