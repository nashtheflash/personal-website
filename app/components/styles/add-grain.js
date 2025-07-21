export function AddGrain({ children, bg }) {
    return(
        <div className={`${bg}`}>
            <div className="w-full h-full bg-[url('/textures/default-noise.png')] bg-repeat bg-[length:50px]">
                {children}
            </div>
        </div>
    )
}

