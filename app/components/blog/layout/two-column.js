export function TwoColumn({children, className}){

    return(
        <div className={`flex flex-col gap-2 sm:flex-row justify-between items-center sm:items-start w-full ${className}`}>
            {children}
        </div>
    )
}
