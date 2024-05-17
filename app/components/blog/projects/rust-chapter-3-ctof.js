'use client';

// import { getGuessingGame } from '@/app/getData';
import { useState } from "react"

export function CelsiusToFahrenheitToKelvin() {
    const [temp, setTemp] = useState({from: 'fahrenheit', to: 'celsius', temp: ''});
    const [calc, setCalc] = useState();

    const handleChange = (value) => { //max is 183
        // const value_clean =  value.replace(/\D/g, "");
        // const value_num = Number(value);
        // if (value_num < 184) seFibNumberRequest(value_clean);
    };
    
    const handleFromChange = (value) => {
        setTemp((prevState) => {
            return ({
                ...prevState,
                from: value
            })
        })
    };
    
    const handleToChange = (value) => {
        setTemp((prevState) => {
            return ({
                ...prevState,
                to: value
            })
        })
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
            <div className='flex justify-center items-center'>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">{temp.temp != '' ? `${temp.temp} ${temp.from} is` : `Temperature`}</div>
                        <div className='flex justify-center item-center'>
                            <div className="stat-value">{temp.temp !== '' ? temp.temp : '---'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={(e) => console.log('submitting')}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <TempInput
                            lable={temp.from}
                            handleChange={handleChange}
                            calc={calc}
                        />
                        <SelectConversion
                            handleChange={handleFromChange}
                            selection={temp.from}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <TempInput
                            lable={temp.to}
                            handleChange={handleChange}
                            calc={calc}
                        />
                        <SelectConversion
                            handleChange={handleToChange}
                            selection={temp.to}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button type='submit' className="btn w-3/4">Convert Temperature</button>
                </div>
            </form>
        </>
    )
}

function TempInput({calc, handleChange, lable}) {

    return(
        <label className="input input-bordered flex items-center gap-2">
            <input 
                type="text" 
                className="grow" 
                placeholder="Search" 
                onChange={(e) => handlechange(e.target.value)} 
                value={calc}
            />
            <span className={`badge text-white w-24 ${lable == 'fahrenheit' ? 'bg-green-500' : lable == 'celsius' ? 'bg-blue-500' : 'bg-red-500'}`}>{capFirstLetter(lable)}</span>
        </label>
    )
}

function SelectConversion({selection, handleChange}){
    return (
        <form>
            <div className='flex justify-center items-center gap-2'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <input 
                        type="radio" 
                        name="radio-8" 
                        className="radio checked:bg-green-500" 
                        checked={selection == 'fahrenheit' ? true : false} 
                        onClick={() => handleChange('fahrenheit')}
                    />
                    <h3 className='m-0'>F</h3>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <input 
                        type="radio" 
                        name="radio-8" 
                        className="radio checked:bg-blue-500" 
                        checked={selection == 'celsius' ? true : false}
                        onClick={() => handleChange('celsius')}
                    />
                    <h3 className='m-0'>C</h3>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <input 
                        type="radio" 
                        name="radio-8" 
                        className="radio checked:bg-red-500" 
                        checked={selection == 'kelvin' ? true : false}j
                        onClick={() => handleChange('kelvin')}
                    />
                    <h3 className='m-0'>K</h3>
                </div>
            </div>
        </form>
    )
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
