import { useFetch } from "./useFetch";
import { BASE_URL, QUERY_KEYS } from "./apiConstants";
import { Product } from "./apiInterfaces";

export function useProducts() {
  const url = `${BASE_URL}/products`;
  return useFetch<Product[]>([QUERY_KEYS.PRODUCTS], url);
}
