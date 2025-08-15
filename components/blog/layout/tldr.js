export function TLDR({text}) {
    return(
        <div className="h-fit w-full">
            <div className='flex flex-nowrap justify-start items-stretch gap-3 h-full w-full'>
                <div className="w-[8px] flex-none bg-secondary"></div>
                <p className="text-black text-xl font-semibold m-0">{text}</p>
            </div>
        </div>
    )
}
