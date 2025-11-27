import { z } from "zod";

const DynamicItemSchema = z.record(z.string(), z.string());

export const OrderSchema = z.object({
  customer_id: z.int().min(0, { message: "No hay id de clientes negativos" }),
  order_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date()),
  delivery_date: z
    .string()
    .min(8, { message: "Formato de fecha requerida dd-mm-yyyy" })
    .pipe(z.coerce.date())
    .optional(),
  notes: z.string().optional(),
  items: z.array(DynamicItemSchema),
});

export type OrderData = z.infer<typeof OrderSchema>;
