"use client";

export default function ProductActions({ id }: { id: number }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      <a
        href={`/dashboard/edit-product/${id}`}
        className="text-green-600 font-medium hover:underline"
      >
        Edit
      </a>

      <button
        onClick={handleDelete}
        className="text-red-600 font-medium hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
