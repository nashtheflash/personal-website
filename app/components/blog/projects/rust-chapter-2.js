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
        if (value_clean <= 100) setCurrentGuess(value_clean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await guessingGame()
        setLoading(false);
    }

    const guessingGame = async () => {
        
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
                <div className="stats shadow bg-base-200 mt-2">
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
                        placeholder="Type guess here (max 100)" 
                        className="input input-bordered w-56 max-w-xs" 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={currentGuess}
                        disabled={currentNumber == -1 || loading && 'disabled'}
                    />
                    <button 
                        type='submit' 
                        className="btn"
                    >
                        { loading && <span className="loading loading-spinner"></span>}
                        {currentNumber !== -1 ? 'Submit Guess' : 'Start Game'}
                    </button>
                </div>
                <h5 className='w-full p-2'>{ gamePrompt }</h5>
            </form>
        </>
    )
}
