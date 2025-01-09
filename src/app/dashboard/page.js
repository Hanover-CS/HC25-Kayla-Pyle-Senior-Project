"use client";
import React, { useEffect, useState } from "react"
import Link from "next/link"

/**
 * A select component which displays all entries from database.
 * @component
 */

export default function Dashboard( { onSelect } ) {
  const [entries, setEntries] = useState([])
  const [selectedValue, setSelectedValue] = useState(undefined)

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


  const handleChange = async (event) => {
    const value = event.target.value
    setSelectedValue(value)

    await fetch('/api/selectedEntry', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ value }),
    })    
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-serif font-bold">Dashboard Page</h1>
        <select className="form-select" value={selectedValue} onChange={handleChange}>
          {entries.map((option) => (
            <option value={option.name} key={option.name}>{option.name}</option>
          ))}
        </select>
        <Link href="/entryView">
          <button disabled={!selectedValue} className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
            Edit Entry
          </button>
        </Link>
      </main>
    </div>
  )
}
