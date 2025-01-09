"use client";
import React, { useEffect, useState } from "react";

/**
 * A select componenet which displays all entries from database.
 * @component
 */

export default function DashboardSelect() {
  const [entries, setEntries] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/entries')
        const entries = await response.json()
        setEntries(entries)
      } catch (err) {
        console.log(`Fetching error\n${err}\nCause: ${err.cause}`)
      }
    }

    fetchEntries()
  }, [])

  return (
    <select className="form-select">
      {entries.map((option) => (
        <option value={option.name} key={option.name}>{option.name}</option>
      ))}
    </select>
  );
}