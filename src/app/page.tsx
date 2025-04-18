"use client";
import { useProducts } from "./_api/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Routes } from "./_utils/routes";
import { ProductItem } from "./_components/ProductItem";
import Link from "next/link";

export default function Home() {
  const { data: products, error, isFetching } = useProducts();

  if (isFetching) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }
  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col p-8 items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Fake Store!</h1>
      <p className="text-lg mb-6">
        Explore our collection of amazing products and find what you need.
      </p>
      <Link
        href={Routes.STORE}
        className="mb-6 px-6 py-3 bg-white text-black hover:bg-gray-200 transition border-1 border-gray-300 rounded-md"
      >
        Shop Now
      </Link>
      <div className="w-full max-w-4xl">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products?.slice(0, 5).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
