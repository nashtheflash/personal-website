'use client'
import Image from 'next/image';
import { BlackTieTitle } from "../section-headers/black-tie";
import { BlogMapWrapper  } from "../map-wrapper";

import ListDot from "@/public/mtn-bike-kc/arrow-list-bullet.png";

export function FAQSection({accessInfo, faqHighlights, faqFoodDrink}) {
    
    const handleClick = () => {
        document.getElementById('faq').scrollIntoView({
            behavior: 'smooth'
        });
    };
    
    return(
        <div className='flex flex-col justify-center items-center h-fit'>
            <BlackTieTitle title="FAQ's"/>
            <div id='faq' className='min-h-80'>
                <div role="tablist" className="tabs tabs-lifted p-2" onClick={handleClick}>
                    <input 
                        type="radio" 
                        name="my_tabs_2" 
                        role="tab" 
                        className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                        aria-label="Access" 
                        defaultChecked 
                    />
                    <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                        <FAQAccess accessInfo={accessInfo}/>
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                        aria-label="Highlights"
                    />
                    <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                            {
                                faqHighlights && faqHighlights.map(({title, text}, index) => (
                                    <FAQItem key={index} title={title} txt={text}/>
                                ))
                            }
                        </div>
                    </div>

                    <input 
                        type="radio" 
                        name="my_tabs_2" 
                        role="tab" 
                        className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                        aria-label="Food/Drink" 
                    />
                    <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                            {
                                faqFoodDrink && faqFoodDrink.map(({title, text}, index) => (
                                    <FAQItem key={index} title={title} txt={text}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FAQItem({title, txt, mapUrl}) {
    return(
        <div className='flex justify-start items-center gap-2 py-1 text-black'>
            <Image
                src={ListDot}
                alt={"List Icon"}
                className='h-4 w-4'
            />
            <p>
                <a href={mapUrl} target='_blank'><strong>{title}</strong></a> {txt}
                
            </p>
        </div>
    )
}

export function FAQAccess({accessInfo}) {
    return(
        <>
            { 
                accessInfo && accessInfo.map((trailhead, i) => {
                    return (
                        <div key={i}>
                            <div className='flex gap-1 justify-between items-start'>
                                <div className='flex flex-col justify-start items-start'>
                                    <div className="flex items-center justify-center bg-[#563730] px-7 w-fit h-fit min-h-10 [clip-path:polygon(5%_0%,95%_0%,100%_20%,100%_80%,95%_100%,5%_100%,0%_80%,0%_20%)]">
                                        <h1 className='text-white text-xl text-center'>{trailhead.trailheadName}</h1>
                                    </div>
                                    <a 
                                        href={trailhead.gMapLinkUrl} 
                                        target='_blank' 
                                        className='text-blue-600'
                                    >
                                        Open In Google Maps
                                    </a>
                                    <p className='text-black mt-4'>
                                        {trailhead.trailheadDiscription}
                                    </p>
                                </div>
                                <BlogMapWrapper
                                    mapUrl={trailhead.gMapEmbedUrl}
                                />
                            </div>
                            { i != accessInfo.length - 1 && <div className="divider"></div>}
                        </div>
                    )
                })
            }
        </>
    )
}

export function FAQSummary({txt}) {
    return(
        <div className='p-2 mx-4 mt-1 mb-4 col-span-1 md:col-span-2 rounded bg-gray-400 bg-opacity-30'>
            <p className='text-black'>{txt}</p>
        </div>
    )
}
