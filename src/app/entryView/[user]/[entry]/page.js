"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";

export default function EntryView({ params }) {
    const paramsUnwrapped = use(params)
    const user = paramsUnwrapped.user.replaceAll("%20", " ")
    const givenName = paramsUnwrapped.entry.replaceAll("%20", " ")
    // Track entry data
    const [name, setName] = useState(givenName);
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const [entries, setEntries] = useState([]);
    // Track states of elements in layout
    const [inputDisabled, setInputDisabled] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const entryResponse = await fetch(
            `/api/entryData?user=${user}&entryName=${name}`,
          );
          const entrydata = await entryResponse.json();
          setType(entrydata.type);
          setText(entrydata.text);
  
          const entriesResponse = await fetch(`/api/entries?user=${user}`);
          const allEntries = await entriesResponse.json();
          const otherEntries = allEntries.filter(item => item.name !== name).map(entry => entry.name)
          setEntries(otherEntries);
        } catch (err) {
          console.log(`Fetching error\n${err}\nCause: ${err.cause}`);
        }
      };
  
      fetchData();
    }, []);
  
    const toggleHidden = () => {
      setIsHidden(!isHidden);
    };
  
    const handleEditClick = () => {
      setInputDisabled(false);
      toggleHidden();
    };
  
    const handleSaveClick = async () => {
      await fetch("/api/entryData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, name: name, text: text }),
      });
      setInputDisabled(true);
      toggleHidden();
    };
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div>
        <div className="h-screen flex flex-col justify-start mx-36 py-4">
          <p 
            className="top-0 left-0 text-3xl font-bold"
          >{name}</p>
          <div className="w-full h-full">
            <textarea
              hidden={!isHidden}
              className="w-full h-full top-0 left-0 p-4 border rounded-lg text-xl"
              type="text"
              disabled={inputDisabled}
              defaultValue={text}
              onChange={handleTextChange}
            ></textarea>
            <p
              hidden={isHidden}
              className="w-full h-full top-0 left-0 p-4 border rounded-lg text-xl"
            >{ text.split(new RegExp(`\\b(${entries.join('|')})\\b`, 'gi')).map((part, index) => {
              if (entries.some(word => new RegExp(word, 'i').test(part))) {
                return (
                  <Link
                  className="text-blue-700 underline"
                    href={`/entryView/${user}/${part}`}
                    replace={true}
                    key={part}
                  >{part}</Link>
                );
              }
              return part;
            }) }</p>
          </div>
        </div>
        <div hidden={isHidden} className="absolute top-4 right-4">
          <button
            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            onClick={handleEditClick}
          >
            Edit Entry
          </button>
        </div>
        <div hidden={!isHidden} className="absolute top-4 right-4">
          <button
            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            onClick={handleSaveClick}
          >
            Save Entry
          </button>
        </div>
      </div>
    );
  }