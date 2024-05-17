'use client';

// import { getGuessingGame } from '@/app/getData';
import { useState } from "react"

export function DaysOfChistmass() {
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
        <div className="flex flex-col justify-center items-center gap-2">
            <button className="btn w-3/4">Generate the 12 Days of Christmass</button>
            <div className="textarea textarea-bordered overflow-y-auto w-full h-80"></div>
       </div>
    )
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

