import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function BlogStatsSection({ children }) {

    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit justify-self-center">
            <div className='grid grid-cols-2 h-full items-center justify-items-center sm:grid-cols-3 md:grid-cols-4'>
                {children}
            </div>
        </div>
    )
}

export function Stat({ icon, title, stat }) {
    return(
        <>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-sm text-gray-600'>{title}</h2>
                <div className="flex gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={icon} className='h-7 w-7'/>
                    <div className='text-black'>
                        <p>{stat}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
