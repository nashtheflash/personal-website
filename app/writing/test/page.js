import Image from 'next/image';

import test5 from "@/public/testing-5.JPEG";
import main from "@/public/main.JPEG";
import left from "@/public/left.JPEG";
import right from "@/public/right.JPEG";

export default function Testing() {

    return(
        <div className="flex flex-col justify-start items-center w-full">

            <Image
                src={main}
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
                <p className="grow">This is some text for testing that I want to see if I can position in the corrent place. This is just more text to see how the sit looks at it. I think that this will actually work. Maybe</p>
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
                src={test5}
                alt={'Logo'}
                width={1500}
                height={400}
            />

        </div>
    )
}
