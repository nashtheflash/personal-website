'use client';

import { getRustMascot } from '@/app/getData';
import { useState } from "react"

export function RustChapter1() {
    const [mascot, setMascot] = useState();
    const [loadingFerris, setLoadingFerris] = useState(false);
    const [loadingClippy, setLoadingClippy] = useState(false);

    const getMascot = async (mascot) => {
        mascot == 'FERRIS' ? setLoadingFerris(true) : setLoadingClippy(true);
        
        const newMascot = await getRustMascot(mascot);
        
        setMascot(newMascot); 
        setLoadingFerris(false); 
        setLoadingClippy(false);
    };
    

    return (
        <>
            <div className="flex justify-center items-center gap-3">
                <button 
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md" 
                    onClick={() => getMascot('FERRIS')}
                    disabled={loadingFerris || loadingClippy && "disabled"}
                >
                    { loadingFerris && <span className="loading loading-spinner"></span>}
                    Generate Ferris
                </button>
                <button 
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md" 
                    onClick={() => getMascot('CLIPPY')}
                    disabled={loadingFerris || loadingClippy && "disabled"}
                >
                    { loadingClippy && <span className="loading loading-spinner"></span>}
                    Generate Clippy
                </button>
            </div>
            <div className='flex justify-center items-center mt-5 w-full'>
                <code className='w-full'>
                    <p className='whitespace-pre-wrap min-h-96'>
                        {mascot ? mascot : 'Pick Mascot Above!'}
                    </p>
                </code>
            </div>
        </>
    )
}
