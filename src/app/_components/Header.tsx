import Link from "next/link";
import { Routes } from "../_utils/routes";

export default function Header() {
  return (
    <header className="flex divide-pink-950 justify-between items-center p-4 bg-gray-800 text-white">
      <Link href={Routes.HOME}>Home</Link>
      <nav className="flex space-x-4">
        <Link href={Routes.STORE}>Store</Link>
        <Link href={Routes.CART}>Cart</Link>
      </nav>
    </header>
  );
}
