'use client'
import { useState, useEffect } from 'react';
import { ProjectNav, Area, MtnBikeGettingStarted } from '@/app/components/blog';
import { getAreaIndex } from '../../../projects/projects/kansas-city-mtn-biking/utils';

//Data is stored localy
import { data } from '../../../projects/projects/kansas-city-mtn-biking/data';


export function KCMtnBikingMain() {
    const [currentArea, setCurrentArea] = useState('');
    const [currentAreaIndex, setCurrentAreaIndex] = useState(-1);
    const [currentData, setCurrentData] = useState();

    useEffect(() => {
        if (currentArea != '') {
            const newIndex = getAreaIndex(data, currentArea) 
            setCurrentAreaIndex(newIndex);
        }
    }, [currentArea])
    
    useEffect(() => {
        if (currentArea != '') {
            setCurrentData(data[currentAreaIndex]);
        }
    }, [currentAreaIndex])

    return(
        <div className="flex w-full min-h-screen">
            <ProjectNav data={data} setCurrentArea={setCurrentArea} />
            {
                currentData ? <Area data={currentData}/> : <MtnBikeGettingStarted/>
            }
        </div>
    )
}
