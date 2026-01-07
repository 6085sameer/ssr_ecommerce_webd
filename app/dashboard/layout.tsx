import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col px-6 py-6">
        {/* Title */}
        <div className="text-2xl font-bold mb-8">
          Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="text-gray-800 font-medium hover:text-black"
          >
             Product Catalog
          </Link>

          <Link
            href="/dashboard/add-product"
            className="text-gray-800 font-medium hover:text-black"
          >
             Add Product
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="text-red-600 font-semibold hover:underline"
            >
               Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center px-6">
          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 px-4 py-2 rounded-md outline-none"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
