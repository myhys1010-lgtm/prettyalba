"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegionPage() {
  const params = useParams();
  const router = useRouter();
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

      <div className="grid grid-cols-2 gap-4">
        {shops.length === 0 && (
          <div>등록된 업소가 없습니다</div>
        )}

        {shops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => router.push(`/shop/${shop.id}`)}
            className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={shop.image_url || "https://via.placeholder.com/300"}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <div className="font-bold">{shop.name}</div>
              <div className="text-sm text-gray-400">
                {shop.category}
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}