"use client";
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import character from "../assets/Character.png"
import event from "../assets/Event.png"
import location from "../assets/Location.png"
import organization from "../assets/Organization.png"

const imageMap = {
  Character: character,
  Event: event,
  Location: location,
  Organization: organization
}

/**
 * A select component which displays all entries from database.
 * @component
 */

export default function Dashboard() {
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
  }

  return (
    <div className="h-screen flex flex-col items-center mx-12 py-4 space-y-4">
        <h1 className="text-4xl font-serif font-bold">World Name</h1>
        <div>
          <button className="bg-gray-400 text-white font-semibold p-2 px-4 rounded hover:bg-gray-600 transition duration-200">
            Add Entry
            </button>
        </div>
        <div className="flex flex-col w-full max-h-screen overflow-y-auto">
          {entries.map((entry) => (
            <Link
            href={{
              pathname: "/entryView",
              query: { entry: entry.name }
            }}
            key={entry.name}>
          <button
            className="w-full flex items-center justify-between p-2 border-2 border-black-200 text-black hover:bg-blue-100 text-left">
              <span>{ entry.name }</span>
              <Image 
                src={imageMap[`${entry.type}`]}
                alt=""
                width={30}
                height={30}
              />
          </button>
          </Link>
          ))}
        </div>
    </div>
  )
}
