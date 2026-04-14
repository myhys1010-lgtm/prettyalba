"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ShopDetailPage() {
  const params = useParams();

  // 🔥 핵심 수정 (문자 → 숫자)
  const id = Number(params.id);

  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    const fetchShop = async () => {
      const { data, error } = await supabase
        .from("shops")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("에러:", error);
      }

      setShop(data);
    };

    fetchShop();
  }, [id]);

  if (!shop) {
    return <div className="text-white p-6">업소 없음</div>;
  }

  return (
    <main className="bg-black min-h-screen text-white p-6">

      <img
        src={shop.image_url || "https://via.placeholder.com/500"}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>

      <div className="text-gray-400 mb-2">
        지역: {shop.region}
      </div>

      <div className="text-gray-400 mb-4">
        카테고리: {shop.category}
      </div>

    </main>
  );
}