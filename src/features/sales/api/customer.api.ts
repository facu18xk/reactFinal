import { CustomerSchema, type Customer } from "../schemas/customer.schema.ts";
import { CrudService } from "./CrudService.api.ts";
import { endpoints } from "./endpoints.ts";
import { apiService } from "./api.ts";

class CustomerService extends CrudService<Customer, typeof CustomerSchema> {
    constructor() {
        super(endpoints.customers, CustomerSchema);
    }

    async getOrders(customerId: number): Promise<Customer> {
        const response = await apiService.get(`${endpoints.customers}${customerId}/orders/`);
        return CustomerSchema.parse(response);
    }

}

export const customersApi = new CustomerService();