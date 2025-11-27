import { InvoiceSchema, type Invoice } from "../schemas/invoice.schema.ts";
import { CrudService } from "./CrudService.api.ts";
import { apiService } from "./api.ts";
import { endpoints } from "./endpoints.ts";
import { z } from "zod";

class InvoicesService extends CrudService<Invoice, typeof InvoiceSchema> {
    constructor() {
        super(endpoints.invoices, InvoiceSchema);
    }

    async recordPayment(invoiceId: number) {
        const response = await apiService.get(`${endpoints.invoices}${invoiceId}/record_payment/`);
        return InvoiceSchema.parse(response);
    }

    async getOverdue() {
        const response = await apiService.get(`${endpoints.invoices}overdue/`);
        return z.array(InvoiceSchema).parse(response.results)
    }

}

export const invoicesApi = new InvoicesService();
