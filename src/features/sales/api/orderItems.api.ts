import { type OrderItem, OrderItemSchema } from "../schemas/orderItem.schema.ts";
import { CrudService } from "./CrudService.api.ts";
import { endpoints } from "./endpoints.ts";

class OrderItemService extends CrudService<OrderItem, typeof OrderItemSchema> {
    constructor() {
        super(endpoints.orderItems, OrderItemSchema);
    }

}

export const orderItemApi = new OrderItemService();

