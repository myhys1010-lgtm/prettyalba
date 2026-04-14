"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegionPage() {
  const params = useParams();
  const router = useRouter();

  const [shops, setShops] = useState<any[]>([]);
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (!params?.region) return;

    const regionValue = String(params.region).toLowerCase();
    setRegion(regionValue);

    const fetchShops = async () => {
      // 🔥 일단 region 조건 제거 (테스트용)
      const { data, error } = await supabase
        .from("shops")
        .select("*");

      console.log("지역:", regionValue);
      console.log("전체 데이터:", data);
      console.log("에러:", error);

      setShops(data || []);
    };

    fetchShops();
  }, [params]);

  return (
    <main className="bg-black min-h-screen text-white p-6">

      <button
        onClick={() => router.push("/")}
        className="mb-4 text-pink-400"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-6">
        {region} 업소 리스트
      </h1>

      {shops.length === 0 && (
        <div>등록된 업소가 없습니다</div>
      )}

      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => router.push(`/shop/${shop.id}`)}
            className="bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-pink-500"
          >
            {shop.name} ({shop.region})
          </div>
        ))}
      </div>

    </main>
  );
}