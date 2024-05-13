import Image from 'next/image';

export function PhotoGallery({title, photos}) {
    return(
        <div className='flex flex-col justify-center items-center py-5'>
                <GalleryTitle title={title}/>
            <div className='max-w-7xl'>
                <Gallery title={title} photos={photos}/>
            </div>
        </div>
    )
}

function GalleryTitle({title}) {
    return(
        <div className='prose'>
            <h1 className='mb-5'>{title}</h1>
        </div>
    )

}

function Gallery({title, photos}) {
    return(
        <div className='grid grid-cols-3 justify-items-center gap-4'>
            {
                photos.map((photo) => (
                    <GalleryImage key={photo} altText={title} url={photo}/>
                ))
            }
        </div>
    ) 
}

function GalleryImage({altText, url}) {
   return(
        <Image
            src={url}
            width={500}
            height={500}
            alt={altText}
        />
    )
}
