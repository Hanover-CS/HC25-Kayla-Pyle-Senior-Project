"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Suspense } from "react"


function EntryViewLayout() {
    const searchParams = useSearchParams()
    const entry = searchParams.get("entry")
    const [entryData, setEntryData] = useState({
        name: '', type: '', text: '' })
    const [inputDisabled, setInputDisabled] = useState(true)
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const fetchEntryData = async () => {
            try {
                const response = await fetch(`/api/entryData?entryName=${entry}`)
                const data = await response.json()
                setEntryData(data)
            } catch (err) {
                console.log(`Fetching error\n${err}\nCause: ${err.cause}`)
            }
        }
        fetchEntryData()
    }, [])

    const toggleHidden = () => {
        setIsHidden(!isHidden)
    }

    const handleEditClick = () => {
        setInputDisabled(false)
        toggleHidden()
    }

    const handleSaveClick = () => {
        setInputDisabled(true)
        toggleHidden()
    }

    return(
        <div>
            <div className='h-screen flex flex-col justify-start mx-36 py-4'>
                <h1 className='text-3xl font-bold'>{ entryData.name }</h1> 
                <textarea
                    className='w-full h-full p-4 border rounded-lg text-xl'
                    type='text' disabled={inputDisabled} 
                    defaultValue={ entryData.text }></textarea>
            </div>
            <div hidden={isHidden} className='absolute top-4 right-4'>
                <button 
                    className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200" 
                    onClick={handleEditClick}>
                    Edit Entry
                </button>
            </div>
            <div hidden={!isHidden} className='absolute top-4 right-4'>
                <button 
                    className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200" 
                    onClick={handleSaveClick}>
                    Save Entry
                </button>
            </div>
        </div>
    )
}

export default function EntryView() {
    return(
        <Suspense>
            <EntryViewLayout />
        </Suspense>
    )
}
