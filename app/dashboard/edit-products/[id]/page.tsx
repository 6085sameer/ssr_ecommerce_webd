"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required().positive(),
  stock: Yup.number().required().min(0),
});

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const product = data.find((p: any) => p.id == id);
        setForm({
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
        });
      });
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await schema.validate(form);

      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="category" value={form.category} onChange={handleChange} className="border p-2 w-full" />
        <input name="price" type="number" value={form.price} onChange={handleChange} className="border p-2 w-full" />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-black text-white px-4 py-2">Update</button>
      </form>
    </div>
  );
}
