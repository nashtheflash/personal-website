'use client';

import { getGuessingGame } from '@/app/getData';
import { useState } from "react"

export function RustChapter2() {
    const [currentNumber, setCurrentNumber] = useState(-1);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gamePrompt, setGamePrompt] = useState('Click the button to start!')

    const handleChange = (value) => {
        const value_clean =  value.replace(/\D/g, "");
        setCurrentGuess(value_clean);
    };

    const guessingGame = async (e, currentNumber, currentGuess) => {
        e.preventDefault();
        const {currentNumber: c, prompt: p} = await getGuessingGame(currentNumber, currentGuess);

        setCurrentNumber(c);
        setGamePrompt(p);
        setCurrentGuess('');
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
            <form onSubmit={(e) => guessingGame(e, currentNumber, currentGuess)}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <input 
                        type="text" 
                        placeholder="Type guess here" 
                        className="input input-bordered w-44 max-w-xs" 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={currentGuess}
                        disabled={currentNumber == -1 ? 'disabled' : ''}
                    />
                    <button type='submit' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md">{currentNumber !== -1 ? 'Submit Guess' : 'Start Game'}</button>
                    <h5 className='w-full'>{ gamePrompt }</h5>
                </div>
            </form>
        </>
    )
}
