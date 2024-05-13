import { MdxImage } from '@/app/components/blog'

export function CenteredImage({image, altText, width, height}) {
    
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <div className={`${height} ${width}`}>
                <MdxImage src={image} alt={altText} />
            </div>
        </div>
    )
}

