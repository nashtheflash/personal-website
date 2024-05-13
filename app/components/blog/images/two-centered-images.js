import { MdxImage } from '@/app/components/blog'

export function TwoCenteredImages({image, altText, width, height}) {
    
    const imageOne = image[0];
    const altTextOne = altText[0];

    const imageTwo = image[1];
    const altTextTwo = altText[1];
    
    return (
        <div className='flex justify-center items-center gap-2 w-full h-full'>
            <div className={`${height} ${width}`}>
                <MdxImage src={imageOne} alt={altTextOne} />
            </div>
            <div className={`${height} ${width}`}>
                <MdxImage src={imageTwo} alt={altTextTwo} />
            </div>
        </div>
    )
}


