export function TLDR({text, children}) {
    return(
        <div className="h-fit w-full">
            <div className='flex flex-nowrap justify-start items-stretch gap-3 h-full w-full'>
                <div className="w-[8px] flex-none bg-secondary"></div>
                <div className="text-black text-xl font-semibold m-0">{children ?? text}</div>
            </div>
        </div>
    )
}
