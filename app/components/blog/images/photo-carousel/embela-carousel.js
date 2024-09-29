import Image from 'next/image'
import { DotButton, useDotButton } from './dot-button'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './arrow-buttons'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel({ slides, options, photos }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {photos.map((photo, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="flex justify-center items-center relative w-full">
                                <Image
                                    src={photo}
                                    width={600}
                                    height={600}
                                    alt="Photo Gallery Picture"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center w-full text-black">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                { false && 
                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={'embla__dot'.concat(
                                    index === selectedIndex ? ' embla__dot--selected' : ''
                                )}
                            />
                        ))}
                    </div>
                }
            </div>
        </section>
  )
}
