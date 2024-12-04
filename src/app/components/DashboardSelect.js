"use client";

import React, { useState } from "react";
// import { Neo4jDriver } from "../lib/neo4j";

// let entries = await Neo4jDriver.getAllEntries();

export default function DashboardSelect( {entries} ) {
  const [selectedElement, setSelectedElement] = useState(null)
  return (
    <select className="form-select">
      {entries.map((option) => (
        <option value={option.name} key={option.name}>{option.name}</option>
      ))}
    </select>
  );
}