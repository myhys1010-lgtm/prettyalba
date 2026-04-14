"use client";

import { useParams, useRouter } from "next/navigation";
import { shops } from "@/data/shops";

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const shop = shops.find((s) => s.id === id);

  if (!shop) {
    return (
      <main className="bg-black min-h-screen text-white p-6">
        업소 없음
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white p-6">

      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-pink-400"
      >
        ← 뒤로가기
      </button>

      {/* 업소 이름 */}
      <h1 className="text-2xl font-bold mb-4">
        {shop.name}
      </h1>

      {/* 정보 */}
      <div className="bg-gray-800 p-4 rounded-xl">
        지역: {shop.region}
      </div>

    </main>
  );
}