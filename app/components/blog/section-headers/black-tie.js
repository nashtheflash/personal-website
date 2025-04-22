
export function BlackTieTitle({title}) {
    return(
        <div className='flex justify-center items-center'>
            <div className="flex items-center justify-center bg-black px-7 w-fit h-14 [clip-path:polygon(100%_0,90%_50%,100%_100%,0_100%,10%_50%,0_0)] ">
                <h1 className='text-white text-2xl'>{title}</h1>
            </div>
        </div>
    )
}
