"use client";

import { useRouter } from "next/navigation";

export default function RegionCard({ region }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${region.slug}`)}
      className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-pink-500 transition"
    >
      {region.name}
    </div>
  );
}