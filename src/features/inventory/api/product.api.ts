import { ProductSchema, type Product } from "../schemas/product.schema";
import { CrudService } from "../../sales/api/CrudService.api";
import { endpoints } from "../../sales/api/endpoints";

class ProductService extends CrudService<Product, typeof ProductSchema> {
    constructor() {
        super(endpoints.products, ProductSchema);
    }
}

export const productsApi = new ProductService();
