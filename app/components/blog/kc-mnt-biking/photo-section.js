import { BlackTieTitle } from '@/app/components/blog/section-headers/black-tie';
import { PhotoCarousel } from '@/app/components/blog/images/photo-carousel';

export function MtnBikePhotoGallery({photos}) {
    return(
        <div className='flex flex-col justify-center items-center'>
            <BlackTieTitle title='PHOTO GALLERY'/>
            <PhotoCarousel photoUrls={photos}/>
        </div>
    )
}
