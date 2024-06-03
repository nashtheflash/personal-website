import { generateMetadata } from '@/utils';
import { PhotoGallery } from "@/app/components/blog";

import featureImage from "@/public/costa-rica/german-bakery/welcome.JPEG";
import bakedGoodsBetter from "@/public/costa-rica/german-bakery/baked-goods-better.JPEG";
import bakedGoods from "@/public/costa-rica/german-bakery/baked-goods.JPEG";
import dinningRoom from "@/public/costa-rica/german-bakery/dinning-room.JPEG";
import food from "@/public/costa-rica/german-bakery/food-pic.JPEG";
import pretzle from "@/public/costa-rica/german-bakery/pretzle.JPEG";
import store from "@/public/costa-rica/german-bakery/store.JPEG";
import tableExample from "@/public/costa-rica/german-bakery/table-example.JPEG";
import welcomeSign from "@/public/costa-rica/german-bakery/welcome-sign.JPEG";
import working from "@/public/costa-rica/german-bakery/working.JPEG";

const photos = [
    {nextImg: featureImage, publicUrl: "/costa-rica/alpha-arenal.JPEG"},
    {nextImg: bakedGoodsBetter, publicUrl: "/costa-rica/german-bakery/baked-goods-better.JPEG"},
    {nextImg: bakedGoods ,publicUrl: "/costa-rica/german-bakery/baked-goods.JPEG"},
    {nextImg: dinningRoom, publicUrl: "/costa-rica/german-bakery/dinning-room.JPEG"},
    {nextImg: food, publicUrl: "/costa-rica/german-bakery/food-pic.JPEG"},
    {nextImg: pretzle, publicUrl: "/costa-rica/german-bakery/pretzle.JPEG"},
    {nextImg: store, publicUrl: "/costa-rica/german-bakery/store.JPEG"},
    {nextImg: tableExample, publicUrl: "/costa-rica/german-bakery/table-example.JPEG"},
    {nextImg: welcomeSign, publicUrl: "/costa-rica/german-bakery/welcome-sign.JPEG"},
    {nextImg: working, publicUrl: "/costa-rica/german-bakery/working.JPEG"},
]

export const metadata = generateMetadata({
    title:"Tom Pan German Bakery",
    description:"All the pictures that I took at Tom Pan German Bakery",
    keywords: ['Food and Drink', 'Costa Rica', 'Pictures', 'Tom Pan German Bakery', 'Nash Bostwick']
});

export default function GermanBakery() {
    return(
        <PhotoGallery
            title='German Bakery Photos'
            photos={photos}
        />
    )
}


