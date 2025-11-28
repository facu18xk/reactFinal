import { z } from "zod";

export const InvoiceSchema = z.object({
  id: z.int().optional(),
  invoice_number: z.string().optional(),
  customer_name: z.string().optional(),
  sale_order: z.int().describe("Sale order"),
  invoice_date: z
    .string()
    .min(8, { message: "Fecha requerida" })
    .pipe(z.coerce.date())
    .describe("Invoice date"),
  due_date: z
    .string()
    .min(8, { message: "Fecha requerida" })
    .pipe(z.coerce.date())
    .describe("Due date"),
  amount: z
    .string()
    .min(1, { message: "Cantidad requerida" })
    .pipe(z.coerce.number())
    .describe("Amunt"),
  paid_amount: z
    .string()
    .min(1, { message: "Cantidad pagada requerida" })
    .pipe(z.coerce.number())
    .describe("Amunt")
    .optional(),
  status: z.enum(["pending", "partial", "paid", "overdue"]).optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
