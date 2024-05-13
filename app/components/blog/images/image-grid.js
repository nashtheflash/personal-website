import { MdxImage } from '@/app/components/blog'

export function ImageGrid({images}) {
   
    //Untested
    return (
        <div className='grid grid-cols-3 justify-center items-center w-full h-full'>
            {
                images.map((image) => (
                    <div className={``}>
                        <MdxImage src={image.url} alt={image.altText} />
                    </div>
                ))
            }
        </div>
    )
}


