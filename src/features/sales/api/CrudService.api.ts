import type { ZodSchema } from "zod";
import z from "zod";
import { apiService } from "./api";


export class CrudService<T, S extends ZodSchema<T>> {
    private readonly endpoint: string;
    private readonly schema: S;
    constructor(baseUrl: string, schema: S) {
        this.endpoint = baseUrl;
        this.schema = schema;
    }

    async create(item: T): Promise<T> {
        try {
            const res = await apiService.post(this.endpoint, item as object);
            return this.schema.parse(res);
        } catch (error) {
            throw error;
        }
    }

    async read(id: number): Promise<T> {
        try {
            const res = await apiService.get(`${this.endpoint}${id}/`);
            return this.schema.parse(res.results);
        } catch (error) {
            throw error;
        }
    }

    async readAll(): Promise<T[]> {
        try {
            const res = await apiService.get(this.endpoint);
            return z.array(this.schema).parse(res.results);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await apiService.delete(`${this.endpoint}${id}/`);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, item: T): Promise<T> {
        try {
            const res = await apiService.put(`${this.endpoint}${id}/`, item as object);
            return this.schema.parse(res);
        } catch (error) {
            throw error;
        }
    }

    async partialUpdate(id: number, item: T): Promise<T> {
        try {
            const res = await apiService.put(`${this.endpoint}${id}/`, item as object);
            return this.schema.parse(res);
        }
        catch (error) {
            throw error;
        }

    }
}

