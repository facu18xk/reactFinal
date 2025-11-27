import { z } from "zod";

export const CustomerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Minimo un carater" })
    .max(200, { message: "No maximo de 200 caracteres" })
    .describe("Name"),

  email: z
    .string()
    .email({ message: "email invalido" })
    .max(254, { message: "No maximo de 254 caracteres" })
    .optional()
    .describe("Email"),

  phone: z
    .string()
    .max(20, { message: "No maximo de 20 caracteres" })
    .optional()
    .describe("Phone"),
  order_counts: z
    .string()
    .optional(),
  address: z.string().optional().describe("Address"),
  is_active: z.boolean().optional().describe("Is active"),
  created_at: z
    .string()
    .min(2, { message: "Fecha requerida" })
    .pipe(z.coerce.date())
    .optional(),
  updated_at: z
    .string()
    .min(2, { message: "Fecha requerida" })
    .pipe(z.coerce.date())
    .optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
