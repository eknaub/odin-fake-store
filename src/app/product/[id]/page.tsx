"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useProductById } from "../../_api/useProducts";
import React, { useState } from "react";
import { useCartContext } from "@/app/_context/CartProvider";

export default function ProductItemPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const { id } = params;

  const { data: product, error, isFetching } = useProductById(id);
  const { addToCart } = useCartContext();

  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  if (isFetching) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="h-80 w-80 object-contain rounded-lg border border-gray-200"
          />
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          Product added to cart!
        </div>
      )}
    </main>
  );
}
