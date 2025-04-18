"use client";
import { useProducts } from "../_api/useProducts";

export default function CartPage() {
  const { data: products } = useProducts();
  console.log("Products:", products);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold">Cart Page</h1>
      <p className="mt-4 text-lg">Your cart is empty!</p>
    </div>
  );
}
