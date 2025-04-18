import Link from "next/link";
import { Routes } from "../_utils/routes";
import { useCartContext } from "../_context/CartProvider";

export default function Header() {
  const { cart } = useCartContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex justify-between items-center p-6 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <Link href={Routes.HOME} aria-label="Home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7m-9 2v10m-4-4h8m4 4v-6a2 2 0 00-2-2h-3m-4 0H5a2 2 0 00-2 2v6"
            />
          </svg>
        </Link>
        <Link
          href={Routes.STORE}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Store
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href={Routes.CART} aria-label="Cart" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l1.4-7H6.6M7 13l-1 5h12l-1-5M10 21a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
