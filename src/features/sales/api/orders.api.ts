import { CrudService } from "./CrudService.api.ts";
import { endpoints } from "./endpoints.ts";
import {
  type SaleOrder,
  SaleOrderSchema,
} from "../schemas/saleOrder.schema.ts";
import { apiService } from "./api.ts";

class OrderService extends CrudService<SaleOrder, typeof SaleOrderSchema> {
  constructor() {
    super(endpoints.orders, SaleOrderSchema);
  }

  async confirm(order_id: number, order: SaleOrder) {
    const response = apiService.post(
      `${endpoints.orders}${order_id}/confirm/`,
      order,
    );
    return response;
  }
}

export const ordersApi = new OrderService();
