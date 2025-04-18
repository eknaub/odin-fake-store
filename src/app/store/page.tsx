"use client";
import { useProducts } from "../_api/useProducts";
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold">Store Page</h1>
      <p className="mt-4 text-lg">Products:</p>
      {products?.map((product) => (
        <li
          key={product.id}
          className="p-4 bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <Image
            src={product.image}
            alt={product.title}
            width={128}
            height={128}
            className="mt-4 object-cover rounded"
          />
          />
        </li>
      ))}
    </div>
  );
}
