import Image from "next/image";
import { Product } from "../_api/apiInterfaces";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: Product;
}

export function ProductItem(props: ProductItemProps) {
  const { product } = props;
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      key={product.id}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full"
    >
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-48 object-contain mb-4 rounded"
        />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>
      </div>
      <button
        onClick={handleNavigate}
        className="cursor-pointer w-full mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
}
