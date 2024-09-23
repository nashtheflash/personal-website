'use client'
import { useState, useEffect } from 'react';
import { ProjectNav, Area, MtnBikeGettingStarted } from '@/app/components/blog';
import { getAreaIndex } from '../../../projects/projects/kansas-city-mtn-biking/utils';

//Data is stored localy
import { data } from '../../../projects/projects/kansas-city-mtn-biking/data';


export function KCMtnBikingMain() {
    const [currentArea, setCurrentArea] = useState('Cedar Niles');
    const [currentAreaIndex, setCurrentAreaIndex] = useState(0);

    useEffect(() => {
        const newIndex = getAreaIndex(data, currentArea) 
        setCurrentAreaIndex(newIndex);
    }, [currentArea])

    return(
        <div className="flex w-full min-h-screen">
            <ProjectNav data={data}/>
            {
                currentArea != '' ? <Area data={data[currentAreaIndex]}/> : <MtnBikeGettingStarted/>
            }
        </div>
    )
}
