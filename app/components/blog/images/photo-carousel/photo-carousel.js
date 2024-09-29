import { EmblaCarousel } from "./embela-carousel"
import "./embela.css"

export function PhotoCarousel({ photoUrls, options }) {
    const OPTIONS = { ...options }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const PHOTOS = photoUrls;

    return (
        <EmblaCarousel photos={PHOTOS} slides={SLIDES} options={OPTIONS} />
    )

}
