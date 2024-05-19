'use client';

import { getTwelveDays } from '@/app/getData';
import { useState } from "react"

export function DaysOfChistmass() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const song = await getTwelveDays()
        setText(song.song);
        setLoading(false);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2">
                <button 
                    className="btn w-3/4" 
                    onClick={handleSubmit}
                >
                    { loading && <span className="loading loading-spinner"></span>}
                    Generate the 12 Days of Christmass
                </button>
                <div className="textarea textarea-bordered overflow-y-auto w-full h-80 whitespace-pre-wrap">{text}</div>
            </div>
            <p>See the code here {"->"} <a href='https://github.com/nashtheflash/personal-website/blob/master/api/rust/chapter-3-12days/twelve-days.rs' title='Twelve Days of Christmass'>Twelve Days of Christmass</a></p>
        </>
    )
}
