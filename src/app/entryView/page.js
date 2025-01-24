"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

function EntryViewLayout() {
  const searchParams = useSearchParams();
  const givenEntryName = searchParams.get("entry");
  // Track entry data
  const [name, setName] = useState(givenEntryName);
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  // Track states of elements in layout
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchEntryData = async () => {
      try {
        const response = await fetch(
          `/api/entryData?entryName=${givenEntryName}`,
        );
        const data = await response.json();
        setType(data.type);
        setText(data.text);
      } catch (err) {
        console.log(`Fetching error\n${err}\nCause: ${err.cause}`);
      }
    };
    fetchEntryData();
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
      body: JSON.stringify({ name: name, text: text }),
    });
    setInputDisabled(true);
    toggleHidden();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-start mx-36 py-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <textarea
          className="w-full h-full p-4 border rounded-lg text-xl"
          type="text"
          disabled={inputDisabled}
          defaultValue={text}
          onChange={handleChange}
        ></textarea>
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

export default function EntryView() {
  return (
    <Suspense>
      <EntryViewLayout />
    </Suspense>
  );
}
