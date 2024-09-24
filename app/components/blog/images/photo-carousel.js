'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function PhotoCarousel({photoUrls}) {
    const totalPictures = photoUrls.length;
    
    const [prevPic, setPrevPic] = useState(totalPictures - 1);
    const [currentPic, setCurrentPic] = useState(0);
    const [nextPic, setNextPic] = useState(1);

    const goTo = (event, type, totalPics) => {
        event.preventDefault()
        const btn = event.currentTarget;

        const carousel = document.querySelector('.carousel')
        const href = btn.getAttribute('href')
        const target = carousel.querySelector(href)
        const left = target.offsetLeft
        carousel.scrollTo({ left: left })

        if (type == 'next') {
            if (currentPic == totalPics - 1) {
                setCurrentPic(0);
            } else {
                setCurrentPic((prev) => prev + 1);
            }
        }
        
        if (type == 'previous') {
            if (currentPic == 0) {
                setCurrentPic(totalPics - 1);
            } else {
                setCurrentPic((prev) => prev - 1);
            }
        }

    }

    useEffect(() => {
        const nextPicture = getPreviousPic(currentPic, totalPictures);
        const prevPicture = getNextPic(currentPic, totalPictures);

        setPrevPic(nextPicture);
        setNextPic(prevPicture);
        
    }, [currentPic])

    return(
        <div className='flex justify-center items-center p-2 px-10'>
            <a 
                href={`#slide${prevPic}`} 
                onClick={(e) => goTo(e, 'previous', totalPictures)} 
                className="btn btn-circle"
            >
                ❮
            </a>
            <div className="carousel w-full mt-2">
                { photoUrls && photoUrls.map((photo, index) => (
                    <div id={`slide${index}`} key={index} className="carousel-item justify-center items-center relative w-full">
                        <Image
                            src={photo}
                            width={600}
                            height={600}
                            alt="Photo Gallery Picture"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        </div>
                    </div>
                ))
                }
            </div>
            <a 
                href={`#slide${nextPic}`} 
                onClick={(e) => goTo(e, 'next', totalPictures)} 
                className="btn btn-circle"
            >
                ❯
            </a>
        </div>
    )
}



const getPreviousPic = (index, arrayLength) => {
    if (index == 0) {
        return arrayLength - 1;
    } else {
        return index - 1;
    }
}

const getNextPic = (index, arrayLength) => {
    if (index == arrayLength - 1) {
        return 0;
    } else {
        return index + 1;
    }
}
