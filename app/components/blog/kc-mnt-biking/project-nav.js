export function ProjectNav({data}) {
    return(
        <ul className="menu bg-base-200 rounded-box w-56 m-2">
            {
                data && data.map(({name, rank}, index) => (
                    <Badge key={index} text={`#${rank}`}><li className="w-full"><a>{name}</a></li></Badge>
                ))

            }
            <Badge text='#2'><li className="w-full"><a>Kill Creek</a></li></Badge>
            <Badge text='#3'><li className="w-full"><a>Blue River Parkway</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Nall Park</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Landahl Park</a></li></Badge>
            <Badge text='#5'><li className="w-full"><a>St. Joe</a></li></Badge>
        </ul>
    )
}

function Badge({children, text}) {
    return(
        <div className="indicator w-full">
            <span className="indicator-item indicator-start badge badge-primary">{text}</span>
            {children}
        </div>
    )
}
