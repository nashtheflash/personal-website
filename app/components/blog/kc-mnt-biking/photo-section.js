import { BlackTieTitle } from '@/app/components/blog/section-headers/black-tie';
import { PhotoCarousel } from '@/app/components/blog';


export function MtnBikePhotoGallery({photos}) {
    return(
        <div className='flex flex-col justify-center items-center gap-2 max-h-screen'>
            <BlackTieTitle title='PHOTO GALLERY'/>
            <PhotoCarousel photoUrls={photos} options={{loop: true}} />
        </div>
    )
}
