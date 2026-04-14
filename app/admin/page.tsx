"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const regions: any = {
  서울: {
    전체: [
      "종로구","중구","용산구","성동구","광진구","동대문구","중랑구",
      "성북구","강북구","도봉구","노원구","은평구","서대문구","마포구",
      "양천구","강서구","구로구","금천구","영등포구","동작구","관악구",
      "서초구","강남구","송파구","강동구"
    ]
  },
  부산: {
    전체: [
      "중구","서구","동구","영도구","부산진구","동래구","남구",
      "북구","해운대구","사하구","금정구","강서구","연제구",
      "수영구","사상구"
    ]
  },
  대구: {
    전체: [
      "중구","동구","서구","남구","북구","수성구","달서구"
    ]
  },
  경기: {
    수원시: ["장안구","권선구","팔달구","영통구"],
    성남시: ["수정구","중원구","분당구"],
    안양시: ["만안구","동안구"],
    안산시: ["상록구","단원구"],
    고양시: ["덕양구","일산동구","일산서구"],
    용인시: ["처인구","기흥구","수지구"]
  }
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("서울");
  const [subCity, setSubCity] = useState("전체");
  const [district, setDistrict] = useState("강남구");
  const [category, setCategory] = useState("room");
  const [imageUrl, setImageUrl] = useState("");

  const getDistricts = () => {
    if (regions[city][subCity]) return regions[city][subCity];
    return regions[city]["전체"];
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("shops").insert([
      {
        name,
        city,
        district,
        category,
        image_url: imageUrl,
      },
    ]);

    if (error) alert(error.message);
    else alert("등록 완료");
  };

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl mb-6">관리자 페이지</h1>

      <div className="space-y-4">

        <input
          placeholder="업소 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        />

        {/* city */}
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setSubCity("전체");
          }}
          className="w-full p-3 bg-gray-800 rounded"
        >
          {Object.keys(regions).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* subCity */}
        <select
          value={subCity}
          onChange={(e) => setSubCity(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          {Object.keys(regions[city]).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* district */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        >
          {getDistricts().map((d: string) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {/* 카테고리 */}
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
          placeholder="이미지 URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-pink-500 w-full p-3 rounded"
        >
          업소 추가
        </button>

      </div>
    </main>
  );
}