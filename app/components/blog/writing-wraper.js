
import Image from 'next/image';


export function WritingWraper({children, header, left, right, footer}) {

    return(
        <div className="flex flex-col justify-start items-center w-full">

            <Image
                src={header}
                alt={'Logo'}
                width={1500}
                height={400}
            />

            <div className="flex justify-between w-full max-w-[1500px]">
                <div className="justify-self-start w-fit">
                    <Image
                        src={left}
                        alt={'Logo'}
                        width={270}
                        height={400}
                    />
                </div>
                <p className="">{children}</p>
                <div className="justify-self-end w-fit">
                    <Image
                        src={right}
                        alt={'Logo'}
                        width={270}
                        height={400}
                    />
                </div>
            </div>
            <Image
                src={footer}
                alt={'Logo'}
                width={1500}
                height={400}
            />

        </div>
    )
}
