// src/app/dashboard/page.js
// Dashboard Page file holds and exports Dashboard react component with a child component DashboardSelect
// The second page openned when running the web app

import { getAllEntries } from "../lib/neo4j.js";
import React from "react";

const entries = await getAllEntries();

function DashboardSelect(entries) {
  return (
    <select>
      {entries.items.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}

export default function Dashboard() {
  const entriesList = [];
  for (let i = 0; i < entries.length; i++) {
    entriesList.push(entries[i].name);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-serif font-bold">Dashboard Page</h1>
        <DashboardSelect items={entriesList} />
      </main>
    </div>
  );
}
