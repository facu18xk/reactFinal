import { CrudService } from "./CrudService.api.ts";
import { endpoints } from "./endpoints.ts";
import { type OrderData, OrderSchema } from "../schemas/orders.schema.ts";
import { apiService } from "./api.ts";

class OrderService extends CrudService<OrderData, typeof OrderSchema> {
    constructor() {
        super(endpoints.orderItems, OrderSchema);
    }

    async confirm(order_id: number, order: OrderData) {
        const response = apiService.post(`${endpoints.orders}${order_id}/confirm/`, order);
        return response;
    }

}

export const ordersApi = new OrderService();

