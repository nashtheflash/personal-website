import { MdxImage } from '@/app/components/blog'

export function CenteredImage({image, altText, width, height}) {
    
    return (
        <div classname='flex flex-col justify-center items-center'>
            <MdxImage src={image} alt={altText} />
        </div>
    )
}

