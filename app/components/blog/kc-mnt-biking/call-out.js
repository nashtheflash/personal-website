export function CallOut({title, text}) {
    return(
        <div className="h-fit w-full bg-[#ddded9] rounded px-4 py-2">
            <h2 className="m-0 pb-2 font-mono font-bold">{title}</h2>
            <p className="m-0">{text}</p>
        </div>
    )
}
