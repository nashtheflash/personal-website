import Image from 'next/image';

export function BlogCard({ title, thumbnail }) {
    return(
        <div className="group h-full w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
                src={thumbnail}
                alt={`${title} thumbnail`}
                style={{objectFit: 'cover', borderRadius: '1rem'}}
                fill={true}
            />
            <h2 className="hidden group-hover:block absolute right-0 bottom-0 p-1 pb-0 font-spartan font-bold text-gray-500 text-5xl uppercase rounded-md rounded-br-2xl backdrop-blur-md">{title}</h2>
        </div>
    )
}
