export function ResizeVideo({children, height, width}){
    return(
        <div className={`${height} ${width} overflow-hidden`}>
            {children}
        </div>
    )
}
