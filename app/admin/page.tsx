"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("seoul");
  const [category, setCategory] = useState("food");

  const handleAdd = async () => {
    if (!name) {
      alert("업소 이름 입력");
      return;
    }

    const { error } = await supabase.from("shops").insert([
      {
        name,
        region,
        category, // 🔥 핵심
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("등록 완료");
    }

    setName("");
  };

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl mb-6">관리자 페이지</h1>

      <div className="space-y-4">

        {/* 업소 이름 */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="업소 이름"
          className="w-full p-3 bg-gray-800 rounded"
        />

        {/* 지역 */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="daegu">대구</option>
        </select>

        {/* 🔥 카테고리 추가 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option value="food">음식점</option>
          <option value="cafe">카페</option>
          <option value="bar">술집</option>
        </select>

        {/* 버튼 */}
        <button
          onClick={handleAdd}
          className="bg-pink-500 p-3 w-full rounded"
        >
          업소 추가
        </button>

      </div>
    </main>
  );
}