export function AddBackground({ 
    children, 
    bgColor='bg-base-200',  
    hasTopo=false,  
}) {
    return(
        <div className={`bg-[url('/textures/default-noise-2.png')] bg-repeat bg-[length:50px] ${bgColor} ${hasTopo ? "bg-[url('/topo-bg-3-black.png')]" : ''}`}>
                {children}
            </div>
    )
}

