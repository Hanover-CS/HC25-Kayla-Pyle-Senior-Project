"use client";

import React from "react";
import { Neo4jDriver } from "../lib/neo4j";
import { useState, useEffect } from "react";

export default function DashboardSelect() {
  const [options, setOptions] = useState([{ name: "" }]);

  useEffect(() => {
    Neo4jDriver.getAllEntries().then( (entries) =>
        setOptions(entries) );    
  }, []);

  return (
    <select className="form-select">
      {options.map((option) => (
        <option value={option.name}>{option.name}</option>
      ))}
    </select>
  );
}
