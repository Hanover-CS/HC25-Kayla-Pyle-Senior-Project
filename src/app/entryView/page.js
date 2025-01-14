"use client"

import { useSearchParams } from 'next/navigation'

export default function EntryView() {
    const searchParams = useSearchParams()
    const entry = searchParams.get("entry")
    return(
        <div>
            <p>Entry View Page</p>
            <p>{ entry }</p>
        </div>
    )
}