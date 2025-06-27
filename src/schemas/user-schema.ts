import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(35),
  surname: z.string().min(3).max(55),
  email: z.string().email().max(90),
});
