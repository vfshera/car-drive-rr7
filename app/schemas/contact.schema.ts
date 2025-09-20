import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters long"),
  email: z.email(),
  message: z.string().min(10, "message must be at least 10 characters long"),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
