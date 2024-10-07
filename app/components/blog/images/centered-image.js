import { MdxImage } from '@/app/components/blog'

export function CenteredImage({image, altText, title, subtitle, width, height}) {
   
    return (
        <>
            <div className='flex justify-center items-center w-full h-full'>
                <div className={`relative group ${height} ${width}`}>
                    <MdxImage src={image} alt={altText} />
                    <div className='absolute left-1 bottom-1 w-fit h-fit px-4 py-0 text-white bg-[#bdd2c9] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out delay-150 duration-300 [clip-path:polygon(0_0,100%_0%,95%_100%,0_100%)]'>
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
            <span className='text-4xl font-bold'>{title}</span>
            {
                subtitle ? <SubTitle subtitle={subtitle}/> : <></>
            }
        </div>
    )
}

function SubTitle({subtitle}) {
    
    return (
        <span className='text-md font-semibold'>This is a subtitle</span>
    )
}
