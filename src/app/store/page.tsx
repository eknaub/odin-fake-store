"use client";
import { useProducts } from "../_api/useProducts";
import Image from "next/image";
import { ProductItem } from "../_components/ProductItem";

export default function StorePage() {
  const { data: products, error, isFetching } = useProducts();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
