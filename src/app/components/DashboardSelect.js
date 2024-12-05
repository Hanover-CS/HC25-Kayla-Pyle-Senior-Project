"use client";
import React, { useState } from "react";

/**
 * A select componenet which displays all entries from database.
 * @component
 */

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