export function TwoColumn({children}){
    return(
        <div className="flex justify-between items-start w-full">
            {children}
        </div>
    )
}
