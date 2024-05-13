import { PhotoGallery } from "@/app/components/blog";

import featureImage from "@/public/costa-rica/alpha-arenal.JPEG";
import dogOnCouch from "@/public/costa-rica/dog-on-couch.JPEG";
import bathroom from "@/public/costa-rica/alpha-arenal-bathroom.JPEG";
import room from "@/public/costa-rica/alpha-arenal-room.JPEG";
import parking from "@/public/costa-rica/alpha-arenal-parking.JPEG";
import hostelMap from "@/public/costa-rica/map-in-hostel.JPEG";
import streetPicture from "@/public/costa-rica/street-picture.JPEG";

const photos = [
    featureImage,
    dogOnCouch,
    bathroom,
    room,
    parking,
    hostelMap,
    streetPicture,
]

export default function AlphaArenalPhotos() {
    return(
        <PhotoGallery
            title='Alpha Arenal Photos'
            photos={photos}
        />
    )
}

