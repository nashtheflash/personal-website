import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Icons
import { 
    faWave,
    faRoute,
    faHashtag,
    faHillRockslide,
    faMountainSun,
    faGauge,
    faTrafficLight,
    faInfo
} from '@awesome.me/kit-237330da78/icons/classic/regular'

export function StatsSection({stats}) {
    
    const {
            distanceMiles,
            numberOfTrails,
            flowTrails,
            downHillTrails,
            XCTrails,
            areaDificulty,
            traffic,
            currentStatus,
    } = stats;

    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit">
            <div className='grid grid-cols-2 h-full items-center justify-items-center sm:grid-cols-3 md:grid-cols-4'>
                <Stat title='Distance Total' Icon={faRoute} stat={`${distanceMiles} Mi`} statAlt={`(${(distanceMiles * 1.609).toFixed(2)} KM)`}/>
                <Stat title='Number of Trails' Icon={faHashtag} stat={numberOfTrails}/>
                <Stat title='Flow' Icon={faWave} stat={flowTrails}/>
                <Stat title='Down Hill' Icon={faHillRockslide} stat={downHillTrails}/>
                <Stat title='XC' Icon={faMountainSun} stat={XCTrails}/>
                <Stat title='Difficulty' Icon={faGauge} stat={areaDificulty}/>
                <Stat title='Traffic' Icon={faTrafficLight} stat={traffic}/>
                <Stat title='Current Status' Icon={faInfo} stat={currentStatus}/>
            </div>
        </div>
    )
}

function Stat({Icon, title, stat, statAlt}) {
    return(
        <>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-sm text-gray-600'>{title}</h2>
                <div className="flex gap-4 justify-center items-center">
                    <FontAwesomeIcon icon={Icon} className='h-7 w-7'/>
                    <div className='flex flex-col gap-0 text-black'>
                        <p>{stat}</p>
                        {statAlt && <span className='text-xs text-gray-600'>{statAlt}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}
