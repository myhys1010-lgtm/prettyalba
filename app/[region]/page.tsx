"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegionPage() {
  const params = useParams();
  const region = String(params.region).toLowerCase();

  const [shops, setShops] = useState<any[]>([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchShops = async () => {
      let query = supabase.from("shops").select("*").eq("region", region);

      if (category !== "all") {
        query = query.eq("category", category);
      }

      const { data } = await query;
      setShops(data || []);
    };

    fetchShops();
  }, [region, category]);

  return (
    <main className="bg-black min-h-screen text-white p-6">

      <h1 className="text-2xl mb-4">{region} 업소</h1>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-6">
        {["all", "food", "cafe", "bar"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-pink-500" : "bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-gray-800 p-4 rounded-xl"
          >
            {shop.name} ({shop.category})
          </div>
        ))}
      </div>

    </main>
  );
}