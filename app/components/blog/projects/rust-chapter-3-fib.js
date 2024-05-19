'use client';

import { getFibonacciNumber } from '@/app/getData';
import { useState } from "react"

export function Fibonacci() {
    const [fibNumber, setFibNumber] = useState({fib: '', req: ''});
    const [fibNumberRequest, setFibNumberRequest] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => { //max is 183
        const value_clean =  value.replace(/\D/g, "");
        const value_num = Number(value);
        if (value_num < 185) setFibNumberRequest(value_clean);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        await fibGenerator(e)
        setLoading(false);
    }

    const fibGenerator = async (e) => {
        e.preventDefault();

        if(!fibNumberRequest) return; 
        const fibNumber = await getFibonacciNumber(fibNumberRequest);

        setFibNumber({fib: fibNumber.fib, req: fibNumberRequest});
        setFibNumberRequest('');
    };

    return (
        <>
            <div className='flex justify-start items-center'>
                <div className="stats shadow w-full">
                    <div className="stat">
                        <div className="stat-title">{fibNumber.req != '' ? `The ${getNumberWithOrdinal(fibNumber.req)} Fibonacci Number` : `Fibonacci Number`}</div>
                        <div className='flex justify-center item-center'>
                            <div className="stat-value">{fibNumber.fib !== '' ? fibNumber.fib : '---'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <input 
                        type="text" 
                        placeholder="Fibonacci Number(Max 184)" 
                        className="input input-bordered w-64 max-w-xs" 
                        onChange={(e) => handleChange(e.target.value)} 
                        value={fibNumberRequest}
                        disabled={loading && "disabled"}
                    />
                    <button type='submit' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md">
                        { loading && <span className="loading loading-spinner"></span>}
                        Get Fibonacci Number
                    </button>
                    <h5 className='w-full'></h5>
                </div>
            </form>
            <p>See the code here {"->"} <a href='https://github.com/nashtheflash/personal-website/blob/master/api/rust/chapter-3-fib/fib.rs' title='Fibonacci Finder'>Fibonacci Finder</a></p>
        </>
    )
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
