"use client"

import React, { useState } from 'react';

export default function NewEntryForm({ isHidden, closeModal }) {
    if (isHidden) {return null}
    const [name, setName] = useState('New Entry')
    const [type, setType] = useState('Character')

    const createEntry = async () => {
        await fetch("/api/newEntry", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, type: type }),
          });
        closeModal()
        window.location.reload()
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleTypeChange = (event) => {
        setType(event.target.value)
    }

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={closeModal}></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
            <h1 className="text-3xl text-center underline">Create New Entry</h1>
            <p className='text-xl'>Title:</p>
            <input
                type='text'
                className='w-full py-1 px-1 border rounded'
                defaultValue={name}
                onChange={handleNameChange}
            />
            <p className="text-xl">Type:</p>
            <select 
                onChange={handleTypeChange}
                className='w-full border rounded py-1 px-1'>
                <option value="Character">Character</option>
                <option value="Event">Event</option>
                <option value="Location">Location</option>
                <option value="Organization">Organization</option>
            </select>
          <button
            className="bottom-0 right-0 text-gray-600 border rounded px-2"
            onClick={createEntry}
          >Create</button>
        </div>
      </div>
    </div>
  );
};