import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customersApi } from "@/features/sales/api/customer.api";
import { productsApi } from "@/features/inventory/api/product.api";
import { Users, Package } from "lucide-react";

export default function HomePage() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [customers, products] = await Promise.all([
          customersApi.readAll(),
          productsApi.readAll(),
        ]);
        setCustomerCount(customers.length);
        setProductCount(products.length);
      } catch (error) {
        console.error("Error fetcheando los datos del dash", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Dashboard mini erp</h1>

      {isLoading ? (
        <div className="text-center">Cargando stats...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/customers">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total clientes
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customerCount}</div>
                <p className="text-xs text-muted-foreground">Ir a clientes</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/products">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total productos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productCount}</div>
                <p className="text-xs text-muted-foreground">Ir a productos</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
