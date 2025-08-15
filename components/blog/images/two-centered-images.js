import { MdxImage } from '@/components/blog'

export function TwoCenteredImages({image, titles, subtitles, altText, width, height}) {
    
    const imageOne = image[0];
    const altTextOne = altText[0];

    const imageTwo = image[1];
    const altTextTwo = altText[1];
    
    return (
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 w-full h-fit'>
            <div className={`relative group h-fit`}>
                <MdxImage src={imageOne} alt={altTextOne} height={height} width={width}/>
                    <div className='absolute left-1 bottom-1 w-fit h-fit px-4 py-0 text-white bg-[#bdd2c9] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out delay-150 duration-300 [clip-path:polygon(0_0,100%_0%,95%_100%,0_100%)]'>
                        {
                            titles && titles[0] ? <Title title={titles[0]} subtitle={subtitles && subtitles[0] ? subtitles[0] : ''}/> : <></>
                        }
                    </div>
            </div>
            <div className={`relative group h-fit`}>
                <MdxImage src={imageTwo} alt={altTextTwo} height={height} width={width}/>
                    <div className='absolute left-1 bottom-1 w-fit h-fit px-4 py-0 text-white bg-[#bdd2c9] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out delay-150 duration-300 [clip-path:polygon(0_0,100%_0%,95%_100%,0_100%)]'>
                        {
                            titles && titles[1] ? <Title title={titles[1]} subtitle={subtitles && subtitles[1] ? subtitles[1] : ''}/> : <></>
                        }
                    </div>
            </div>
        </div>
    )
}



function Title({title, subtitle}) {
    
    return (
        <div className='flex flex-col justify-start items-start'>
            <span className='text-2xl font-bold'>{title}</span>
            {
                subtitle && subtitle != '' ? <SubTitle subtitle={subtitle}/> : <></>
            }
        </div>
    )
}

function SubTitle({subtitle}) {
    
    return (
        <span className='text-xs font-semibold'>{subtitle}</span>
    )
}
