export function TwoColumn({children}){
    return(
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full">
            {children}
        </div>
    )
}
