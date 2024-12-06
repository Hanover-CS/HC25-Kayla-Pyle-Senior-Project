import React from "react";
import DashboardSelect from "../components/DashboardSelect";
import { Neo4jDriver } from "../lib/neo4j";

/**
 * All entires from the database
 * @type {list}
 */
let entries = await Neo4jDriver.getAllEntries();

/**
 * A page component that displays the dashboard
 * @component
 */
export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-serif font-bold">Dashboard Page</h1>
        <DashboardSelect entries={entries} />
      </main>
    </div>
  );
}
