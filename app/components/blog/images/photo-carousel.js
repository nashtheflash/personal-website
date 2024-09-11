'use client'
import Image from 'next/image'
import { useState } from 'react';

export function PhotoCarousel({photoUrls}) {
    const totalPictures = photoUrls.length;

    const [prevPic, setPrevPic] = useState(totalPictures - 1);
    const [nextPic, setNextPic] = useState(1);

    const goTo = (event, type, totalPics) => {
        event.preventDefault()
        const btn = event.currentTarget;

        const carousel = document.querySelector('.carousel')

        const href = btn.getAttribute('href')
        const target = carousel.querySelector(href)
        const left = target.offsetLeft
        carousel.scrollTo({ left: left })

        //Lands on final pic   
        if (nextPic == totalPictures - 1 && type == 'next') {
            setNextPic(0);
            setPrevPic(totalPictures - 2);
        } 
        
        if (nextPic != totalPictures - 1 && type == 'next') {
            setNextPic((prev) => {
                 setPrevPic(prev <= 0 ? totalPictures - 1 : prev - 1);
                 return prev + 1;
            })
        } 

        if (prevPic == 0 && type == 'previous') {
            setPrevPic((prev) => {
                setNextPic(prev + 1);
                return totalPictures - 1
            })
        }

        if (prevPic != 0 && type == 'previous') {
            setNextPic((prev) => prev - 1);
            setPrevPic((prev) => prev - 1);
        }
    }

    return(
        <div className='flex justify-center items-center px-10'>
            <a href={`#slide${prevPic}`} onClick={(e) => goTo(e, 'previous', totalPictures)} className="btn btn-circle">❮</a>
            <div className="carousel w-full mt-2">
                { photoUrls && photoUrls.map((photo, index) => (
                    <div id={`slide${index}`} key={index} className="carousel-item justify-center items-center relative w-full">
                        <Image
                            src={photo}
                            width={600}
                            height={600}
                            alt="Picture of the author"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        </div>
                    </div>
                ))
                }
            </div>
            <a href={`#slide${nextPic}`} onClick={(e) => goTo(e, 'next', totalPictures)} className="btn btn-circle">❯</a>
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
