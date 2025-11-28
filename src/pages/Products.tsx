import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsApi } from "@/features/inventory/api/product.api";
import { type Product } from "@/features/inventory/schemas/product.schema";
import { useEffect, useState } from "react";
import { ProductForm } from "@/features/inventory/components/ProductForm";
import { DeleteProductModal } from "@/features/inventory/components/DeleteProductModal";

export default function Products() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    async function fetchProducts() {
        try {
            const data = await productsApi.readAll();
            setProducts(data);
        } catch (error) {
            console.error("Error obteniendo productos:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = () => {
        setProductToEdit(null);
        setIsFormOpen(true);
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setIsFormOpen(true);
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
    };

    const handleFormSubmit = async (values) => {
        try {
            if (productToEdit) {
                await productsApi.update(productToEdit.id, values);
            } else {
                await productsApi.create(values);
            }
            await fetchProducts();
        } catch (error) {
            console.error("Error guardando el producto:", error);
        } finally {
            setIsFormOpen(false);
            setProductToEdit(null);
        }
    };

    const handleDeletionConfirm = async (id: number) => {
        try {
            await productsApi.delete(id);
            await fetchProducts();
        } catch (error) {
            console.error("Error elimininado el producto:", error);
        } finally {
            setProductToDelete(null);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return !products ? (
        <div>
            <h3>No se puede cargar los productos</h3>
        </div>
    ) : (
        <div>
            <div className="flex flex-col lg:flex-row xl:flex-row lg:justify-between lg:items-center mb-10 gap-y-10">
                <h1 className="text-3xl font-bold">Productos</h1>
                <Button className="bg-primary" onClick={handleCreate}>
                    <Plus />
                    Crear producto
                </Button>
            </div>

            <section>
                <Table>
                    <TableCaption>Todos los productos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Nombre</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product: Product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.category?.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock_quantity}</TableCell>
                                <TableCell>
                                    {product.is_active ? "Active" : "Inactive"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant={"ghost"}
                                        className="hover:cursor-pointer"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        variant={"ghost"}
                                        className="hover:cursor-pointer hover:text-destructive"
                                        onClick={() => handleDelete(product)}
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {isFormOpen && (
                <ProductForm
                    productToEdit={productToEdit}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}

            {productToDelete && (
                <DeleteProductModal
                    productToDelete={productToDelete}
                    onClose={() => setProductToDelete(null)}
                    onConfirm={handleDeletionConfirm}
                />
            )}
        </div>
    );
}
