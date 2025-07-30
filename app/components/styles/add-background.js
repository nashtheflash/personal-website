export function AddBackground({ 
    children, 
    bgColor='bg-base-200',  
    hasTopo=false,  
}) {
    return(
        <div className={`${bgColor} ${hasTopo ? "bg-[url('/topo-bg-3-black.png')]" : ''}`}>
            <div className="bg-[url('/textures/default-noise-6.png')] bg-repeat bg-[length:50px]">
                {children}
            </div>
        </div>
    )
}

