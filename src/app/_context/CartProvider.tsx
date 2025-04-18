import { createContext, useContext, useReducer } from "react";
import { CartItem, Product } from "../_api/apiInterfaces";
import { cartReducer } from "./cartReducer";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", product });
  const removeFromCart = (productId: number) =>
    dispatch({ type: "REMOVE_FROM_CART", productId });
  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
