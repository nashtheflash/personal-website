'use client';

import { getFtoCtoK } from '@/app/getData';
import { useState } from "react"

export function CelsiusToFahrenheitToKelvin() {
    const [result, setResult] = useState({from: 'fahrenheit', to: 'celsius', temp: ''});
    const [calc, setCalc] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleFromTempChange = (value) => {
        setResult((prevState) => {
            return ({
                ...prevState,
                from: value
            })
        })
    };
    
    const handleToTempChange = (value) => {
        setResult((prevState) => {
            return ({
                ...prevState,
                to: value
            })
        })
    };
    
    const handleTempInput = (value) => {
        const value_clean = Number(parseInt(value.replace(/,/g, '')));
        if(value_clean > -2147483648 && value_clean < 2147483648) setCalc(value_clean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        await tempConversion()
        setLoading(false);
    }

    const tempConversion = async () => {
        const res = await getFtoCtoK(result.from, result.to, calc);
        
        setResult((prevState) => ({
            ...prevState,
            temp: res.tempreture
        }));

    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-center items-center gap-3 my-5 w-full'>
                    <TempBox
                        isDisabled={false}
                        handleTempInput={handleTempInput}
                        result={result}
                        calc={calc}
                        defaultSelect={'fahrenheit'}
                        handleOptionChange={handleFromTempChange}
                    />
                    <h3>{'='}</h3>
                    <TempBox
                        isDisabled={true}
                        handleTempInput={handleTempInput}
                        result={result}
                        calc={calc}
                        defaultSelect={'celsius'}
                        handleOptionChange={handleToTempChange}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <button type='submit' className="btn w-3/4">
                        { loading && <span className="loading loading-spinner"></span>}
                        Convert Temperature
                    </button>
                </div>
            </form>
            <p>See the code here {"->"} <a href='https://github.com/nashtheflash/personal-website/blob/master/api/rust/chapter-3-ftoctok/ftoctok.rs' title='Fahrenheit to Celsius to Kelvin'>Fahrenheit to Celsius to Kelvin</a></p>
        </>
    )
}

function TempBox({isDisabled, handleTempInput, result, calc, defaultSelect, handleOptionChange}) {

    return(
        <div className='w-44 h-24 border-2 border-gray-500 rounded-md overflow-hidden'>
            <div className='flex flex-col justify-center items-center'>
               <TempInput
                    isDisabled={isDisabled}
                    handleTempInput={handleTempInput}
                    result={result}
                    calc={calc}
                /> 
               <OptionInput
                    defaultSelect={defaultSelect}
                    value={defaultSelect == 'fahrenheit' ? result.from : result.to}
                    handleChange={handleOptionChange}
                /> 
            </div>
        </div>
    )
}

function TempInput({isDisabled, handleTempInput, result, calc}) {
    return(
        <input 
            type="text" 
            placeholder="0" 
            className="input input-ghost w-full max-w-xs h-12 rounded-none" 
            disabled={isDisabled}
            value={isDisabled ? Number(result.temp).toLocaleString() : Number(calc).toLocaleString()} 
            onChange={(e) => handleTempInput(e.target.value)}
        />
    )

}

function OptionInput({defaultSelect, handleChange, value}) {
    return(
        <select 
            className="select w-full max-w-xs h-10 rounded-none"
            defaultValue={value}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value='fahrenheit'>Fahrenheit</option>
            <option value='celsius'>Celsius</option>
            <option value='kelvin'>Kelvin</option>
        </select>
    )
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
