'use client';

import { getGuessingGame } from '@/app/getData';
import { useState } from "react"

export function RustChapter2() {
    const [currentNumber, setCurrentNumber] = useState(-1);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gamePrompt, setGamePrompt] = useState('Click the button to start!')
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        const value_clean =  value.replace(/\D/g, "");
        setCurrentGuess(value_clean);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        await tempConversion(e)
        setLoading(false);
    }

    const tempConversion = async (e, currentNumber, currentGuess) => {
        e.preventDefault();
        
        setLoading(true);
        const {currentNumber: c, prompt: p} = await getGuessingGame(currentNumber, currentGuess);

        setCurrentNumber(c);
        setGamePrompt(p);
        setCurrentGuess('');
        setLoading(false);
    };

    return (
        <>
            <div className='flex justify-start items-center'>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Current Number</div>
                        <div className='flex justify-center item-center'>
                            <div className="stat-value">{currentNumber !== -1 ? currentNumber : '---'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <input 
                        type="text" 
                        placeholder="Type guess here" 
                        className="input input-bordered w-44 max-w-xs" 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={currentGuess}
                        disabled={currentNumber == -1 || loading && 'disabled'}
                    />
                    <button 
                        type='submit' 
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
                    >
                        { loading && <span className="loading loading-spinner"></span>}
                        {currentNumber !== -1 ? 'Submit Guess' : 'Start Game'}
                    </button>
                    <h5 className='w-full'>{ gamePrompt }</h5>
                </div>
            </form>
        </>
    )
}
