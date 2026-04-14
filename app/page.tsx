import RegionCard from "./components/RegionCard";

const regions = [
  { name: "서울", slug: "seoul" },
  { name: "부산", slug: "busan" },
  { name: "대구", slug: "daegu" },
];

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        PRETTYALBA
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <RegionCard key={region.slug} region={region} />
        ))}
      </div>

    </main>
  );
}