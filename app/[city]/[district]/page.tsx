import { supabase } from "@/lib/supabase";

export default async function Page({ params }: any) {
  const resolvedParams = await params;

  const city = decodeURIComponent(resolvedParams.city);
  const district = decodeURIComponent(resolvedParams.district);

  const { data } = await supabase
    .from("shops")
    .select("*")
    .eq("city", city)
    .eq("district", district);

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl mb-6">
        {city} {district} 업소
      </h1>

      {data?.length === 0 && <p>업소 없음</p>}

      <div className="grid grid-cols-2 gap-4">
        {data?.map((shop: any) => (
          <div key={shop.id} className="bg-gray-800 rounded overflow-hidden">
            <img src={shop.image_url} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="font-bold">{shop.name}</p>
              <p className="text-sm text-gray-400">{shop.category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}