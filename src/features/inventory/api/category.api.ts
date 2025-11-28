import { CategorySchema, type Category } from "../schemas/category.schema";
import { CrudService } from "../../sales/api/CrudService.api";
import { endpoints } from "../../sales/api/endpoints";

class CategoryService extends CrudService<Category, typeof CategorySchema> {
    constructor() {
        super(endpoints.categories, CategorySchema);
    }
}

export const categoriesApi = new CategoryService();
