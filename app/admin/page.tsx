"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const regions: any = {
  서울: [
    "강남구","서초구","송파구","강동구",
    "마포구","용산구","중구","종로구"
  ],
  부산: [
    "해운대구","수영구","부산진구","동래구"
  ]
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("서울");
  const [district, setDistrict] = useState("강남구");
  const [category, setCategory] = useState("room");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = async () => {
    if (!name) {
      alert("업소 이름 입력");
      return;
    }

    const { error } = await supabase.from("shops").insert([
      {
        name,
        city,
        district,
        category,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("등록 완료");
    }

    setName("");
    setImageUrl("");
  };

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl mb-6">관리자 페이지</h1>

      <div className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="업소 이름"
          className="w-full p-3 bg-gray-800 rounded"
        />

        {/* 🔥 city 선택 */}
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setDistrict(regions[e.target.value][0]);
          }}
          className="w-full p-3 bg-gray-800 rounded"
        >
          {Object.keys(regions).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* 🔥 district 선택 */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          {regions[city].map((d: string) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option value="room">룸살롱</option>
          <option value="karaoke">노래방</option>
          <option value="bar">유흥주점</option>
          <option value="club">클럽</option>
          <option value="massage">마사지</option>
        </select>

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="이미지 URL"
          className="w-full p-3 bg-gray-800 rounded"
        />

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