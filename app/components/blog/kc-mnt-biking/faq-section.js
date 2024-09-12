'use client'
import Image from 'next/image';
import { BlackTieTitle } from "../section-headers/black-tie";
import { BlogMapWrapper  } from "../map-wrapper";

import ListDot from "@/public/mtn-bike-kc/arrow-list-bullet.png";

export function FAQSection() {
    
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
                        <FAQAccess/>
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
                            <FAQItem title='Columbine Bypass' txt='is a nice jump trail located in the middle of the trail system. Great place for laps!'/>
                            <FAQItem title='Columbine Loop' txt='is best riden counter clockwise'/>
                            <FAQItem title='Technical Loop' txt='is as chossy as this trail system gets. I prefer riding this trail counter clockwise.'/>
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
                            <FAQItem title='Best post ride beer?' txt='Red Crow Brewing is the hands down winner. I would go with an Isabelle & a Spicy Honey Mustard Chicken sandwich' mapUrl={'https://maps.app.goo.gl/MucY3w3SHfBuGt5b6'}/>
                            <FAQItem title='Lunch Time?' txt="Bonito Michoacán is a grocery story that has a small cafe that serves authentic mexican food!" mapUrl={'https://maps.app.goo.gl/wXreS4aGshSC4W159'}/>
                            <FAQItem title="BB's Grill" txt="BB's is better than I would have thought. Good beer selection and the Jalapeno Popper Chicken Sandwich is to die for." mapUrl={'https://maps.app.goo.gl/965fntmMo9di8ubB6'}/>
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

export function FAQAccess() {
    const accessInfo = [
        {
            trailheadName: 'Clare Road Trailhead',
            gMapLinkUrl: 'https://maps.app.goo.gl/hNYoWBXYHtPLdLH97',
            gMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8963.888413691491!2d-94.8790833808989!3d38.90040089327876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c09717e637c3c3%3A0x326b4c9e2476ee0d!2sCedar%20Niles%20Park%20Clare%20Road%20Trailhead!5e0!3m2!1sen!2sus!4v1724972397538!5m2!1sen!2sus',
            trailheadDiscription: 'This is the main access point for the trails. From here you can jump right onto the Columbine Connector trail that will take you out to Billy Goat and the Columbine Loop.'
        },
        {
            trailheadName: '119th Street Trailhead',
            gMapLinkUrl: 'https://maps.app.goo.gl/KySzsCW7vRfB2vyd9',
            gMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12419.436404190137!2d-94.88314610747071!3d38.90433725660361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0977bb9da0e6d%3A0x11414b7fb807be8c!2sCedar%20Niles%20Park%20119th%20St%20Trailhead!5e0!3m2!1sen!2sus!4v1724975254860!5m2!1sen!2sus',
            trailheadDiscription: 'I would call this secondary access. From here you will have to head down the paved path across the bridge and twords the woods. You will see the entrance to Scape Goat. Ride up Scape Goat to access the rest of the trail system.'
        }
    ]


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
