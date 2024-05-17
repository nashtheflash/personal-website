'use client';

// import { getGuessingGame } from '@/app/getData';
import { useState } from "react"

export function Fibonacci() {
    const [fibNumber, setFibNumber] = useState({fib: '', req: ''});
    const [fibNumberRequest, seFibNumberRequest] = useState('');

    const handleChange = (value) => { //max is 183
        const value_clean =  value.replace(/\D/g, "");
        const value_num = Number(value);
        if (value_num < 184) seFibNumberRequest(value_clean);
    };

    // const guessingGame = async (e, currentNumber, currentGuess) => {
    //     e.preventDefault();
    //     const {currentNumber: c, prompt: p} = await getGuessingGame(currentNumber, currentGuess);
    //
    //     setCurrentNumber(c);
    //     setGamePrompt(p);
    //     setCurrentGuess('');
    // };

    return (
        <>
            <div className='flex justify-start items-center'>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">{fibNumber.req != '' ? `The ${getNumberWithOrdinal(fibNumber.req)} Fibonacci Number` : `Fibonacci Number`}</div>
                        <div className='flex justify-center item-center'>
                            <div className="stat-value">{fibNumber.fib !== '' ? fibNumber.fib : '---'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={(e) => console.log('submitting')}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <input 
                        type="text" 
                        placeholder="Fibonacci Number(Max 183)" 
                        className="input input-bordered w-64 max-w-xs" 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={fibNumberRequest}
                    />
                    <button type='submit' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md">Get Fibonacci Number</button>
                    <h5 className='w-full'></h5>
                </div>
            </form>
        </>
    )
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
