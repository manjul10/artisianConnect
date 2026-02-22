import { Suspense } from "react";
import CategorySidebar from "@/components/products/CategorySidebar";
import ProductList from "@/components/products/ProductList";

export default function ProductsPage() {
  return (
    <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <a href="/" className="hover:text-teal-500 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-700">Products</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            Our Products
          </h1>
        </div>

        <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar />

            <div className="flex-1 min-w-0">
              {/* <div className="mb-6">
                                <ProductSearch />
                            </div> */}

              <ProductList />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
