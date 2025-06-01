import { HomeHero } from "@/Components/Home/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-auto">
        <div className="bg-white">
          <HomeHero />
        </div>
      </main>
    </div>
  );
}
