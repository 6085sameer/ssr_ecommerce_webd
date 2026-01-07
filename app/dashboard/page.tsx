import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import ProductActions from "./ProductActions";

type Product = {
  id: number;
  name: string;
  category: string | null;
  price: number | null;
  stock: number | null;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-auth")) {
    redirect("/login");
  }

  const host = (await headers()).get("host");
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  const products: Product[] = res.ok ? await res.json() : [];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Catalogue</h1>

      <div className="bg-white rounded-xl shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">₹{p.price}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4">
                  <ProductActions id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-6 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
