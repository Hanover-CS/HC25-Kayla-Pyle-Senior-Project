"use client";
import React, { useState } from "react";
import Image from "next/image";
import worldMap from "./assets/WorldMap.jpg";
import LogInForm from "./components/LogInForm";

/**
 * A page component that displays the home screen for the website
 * @component
 */
export default function Home() {
  const [formHidden, setFormHidden] = useState(true);

  const toggleFormHidden = () => {
    setFormHidden(!formHidden);
  };

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
        <button
          className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
          onClick={toggleFormHidden}
        >
          Log In
        </button>
      </div>
      <LogInForm isHidden={formHidden} closeModal={toggleFormHidden} />
    </div>
  );
}
