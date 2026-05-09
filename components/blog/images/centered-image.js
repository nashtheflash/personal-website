import { MdxImage } from '@/components/blog'

export function CenteredImage({image, altText, title, subtitle, width, height}) {

    return (
        <>
            <div className='flex justify-center items-start w-full'>
                <div className='grid group w-fit not-prose'>
                    <div className='col-start-1 row-start-1'>
                        <MdxImage src={image} alt={altText} width={width} height={height} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"/>
                    </div>
                    <div className='col-start-1 row-start-1 self-end justify-self-start z-10 w-fit h-fit px-4 py-0 text-white bg-[#bdd2c9] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out delay-150 duration-300 [clip-path:polygon(0_0,100%_0%,95%_100%,0_100%)]'>
                        {
                            title ? <Title title={title} subtitle={subtitle}/> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


function Title({title, subtitle}) {

    return (
        <div className='flex flex-col justify-start items-start'>
            <span className='text-4xl font-bold pr-3'>{title}</span>
            {
                subtitle ? <SubTitle subtitle={subtitle}/> : <></>
            }
        </div>
    )
}

function SubTitle({subtitle}) {

    return (
        <span className='text-md font-semibold'>{subtitle}</span>
    )
}
