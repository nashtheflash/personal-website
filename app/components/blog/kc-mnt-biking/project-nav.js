export function ProjectNav({ data, setCurrentArea }) {

    function handleAreaChange(newArea) {
        setCurrentArea(newArea); 
    }


    return(
        <ul className="menu bg-base-200 rounded-box w-56 m-2">
            {
                data && data.map(({name, rank}, index) => (
                    <Badge key={index} text={`#${rank}`}>
                        <li className="w-full">
                            <a onClick={() => handleAreaChange(name)}>
                                {name}
                            </a>
                        </li>
                    </Badge>
                ))

            }
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
