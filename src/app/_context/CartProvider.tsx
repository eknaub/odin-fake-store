import { createContext, useContext, useReducer } from "react";
import { CartItem, Product } from "../_api/apiInterfaces";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.product.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.productId);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    default:
      throw new Error(`Unhandled action type: ${(action as CartAction).type}`);
  }
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
