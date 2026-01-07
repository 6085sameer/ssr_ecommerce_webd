"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const productSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .min(0, "Stock cannot be negative"),
});

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await productSchema.validate(form, { abortEarly: false });

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/dashboard");
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors.join(", "));
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      {error && (
        <p className="text-red-600 mb-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
