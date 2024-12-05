
import Image from "next/image";
import Link from "next/link";
import worldMap from "./assets/WorldMap.jpg";

/**
 * A page component that displays the home screen for the website
 * @component
 */
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-serif font-bold">MyWorld Wiki</h1>
        <Image
          className=""
          src={worldMap}
          alt="WorldMap"
          width={400}
          height={400}
        />
      </main>
      <div className="absolute top-0 right-0 p-8">
        <Link href="/dashboard">
          <button className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
