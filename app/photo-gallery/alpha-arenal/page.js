import { PhotoGallery } from "@/app/components/blog";

import featureImage from "@/public/costa-rica/alpha-arenal.JPEG";
import dogOnCouch from "@/public/costa-rica/dog-on-couch.JPEG";
import bathroom from "@/public/costa-rica/alpha-arenal-bathroom.JPEG";
import room from "@/public/costa-rica/alpha-arenal-room.JPEG";
import parking from "@/public/costa-rica/alpha-arenal-parking.JPEG";
import hostelMap from "@/public/costa-rica/map-in-hostel.JPEG";
import streetPicture from "@/public/costa-rica/street-picture.JPEG";

const photos = [
    {nextImg: featureImage, publicUrl: "/costa-rica/alpha-arenal.JPEG"},
    {nextImg: dogOnCouch, publicUrl: "/costa-rica/dog-on-couch.JPEG"},
    {nextImg: bathroom, publicUrl: "/costa-rica/alpha-arenal-bathroom.JPEG"},
    {nextImg: room, publicUrl: "/costa-rica/alpha-arenal-room.JPEG"},
    {nextImg: parking, publicUrl: "/costa-rica/alpha-arenal-parking.JPEG"},
    {nextImg: hostelMap, publicUrl: "/costa-rica/map-in-hostel.JPEG"},
    {nextImg: streetPicture, publicUrl: "/costa-rica/street-picture.JPEG"}
]

export default function AlphaArenalPhotos() {
    return(
        <PhotoGallery
            title='Alpha Arenal Photos'
            photos={photos}
        />
    )
}

