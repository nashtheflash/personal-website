'use client';

import { getFtoCtoK } from '@/app/getData';
import { useState } from "react"

export function CelsiusToFahrenheitToKelvin() {
    const [temp, setTemp] = useState({from: 'fahrenheit', to: 'celsius', temp: ''});
    const [calc, setCalc] = useState();
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        await tempConversion()
        setLoading(false);
    }

    const tempConversion = async () => {
        const temp = await getFtoCtoK(temp.from, temp.to, calc);
        
        setTemp((prevState) => ({
            ...prevState,
            temp: temp.tempreture
        }));

    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-start items-center gap-3 my-5 w-full'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <TempInput
                            lable={temp.from}
                            handleChange={handleFromChange}
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
                            handleChange={handleToChange}
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
                onChange={(e) => handleChange(e.target.value)} 
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
