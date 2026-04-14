"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DistrictPage() {
  const params = useParams();
  const router = useRouter();

  const city = decodeURIComponent(String(params.city));
  const district = decodeURIComponent(String(params.district));

  const [shops, setShops] = useState<any[]>([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchShops = async () => {
      let query = supabase
        .from("shops")
        .select("*")
        .eq("city", city)
        .eq("district", district);

      if (category !== "all") {
        query = query.eq("category", category);
      }

      const { data } = await query;
      setShops(data || []);
    };

    fetchShops();
  }, [city, district, category]);

  return (
    <main className="bg-black min-h-screen text-white p-6">

      <h1 className="text-2xl mb-2">
        {city} {district}
      </h1>

      {/* 카테고리 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "전체" },
          { key: "room", label: "룸살롱" },
          { key: "karaoke", label: "노래방" },
          { key: "bar", label: "유흥주점" },
          { key: "club", label: "클럽" },
          { key: "massage", label: "마사지" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`px-4 py-2 rounded ${
              category === cat.key ? "bg-pink-500" : "bg-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div className="grid grid-cols-2 gap-4">
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

        {shops.length === 0 && (
          <div className="text-gray-400">
            업소 없음
          </div>
        )}
      </div>

    </main>
  );
}