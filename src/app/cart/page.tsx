"use client";
import { useCartContext } from "../_context/CartProvider";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartContext();
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain rounded border border-gray-200"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="cursor-pointer px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="cursor-pointer px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold">Total: ${totalPrice}</p>
            <button className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
