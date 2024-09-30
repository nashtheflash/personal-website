import Image from 'next/image';

//Icons
import DistanceIcon from "@/public/mtn-bike-kc/distance.png";
import PavementIcon from "@/public/mtn-bike-kc/pavement.png";
import SingleTrackIcon from "@/public/mtn-bike-kc/singletrack.png";
import RideabilityIcon from "@/public/mtn-bike-kc/rideability.png";
import DifficultyIcon from "@/public/mtn-bike-kc/difficulty.png";
import DaysIcon from "@/public/mtn-bike-kc/days.png";
import HighPointIcon from "@/public/mtn-bike-kc/highpoint.png";
import AscentIcon from "@/public/mtn-bike-kc/ascent.png";

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
                <Stat title='Distance Total' Icon={DistanceIcon} stat={`${distanceMiles} Mi`} statAlt={`(${(distanceMiles * 1.609).toFixed(2)} KM)`}/>
                <Stat title='Number of Trails' Icon={SingleTrackIcon} stat={numberOfTrails}/>
                <Stat title='Flow' Icon={DifficultyIcon} stat={flowTrails}/>
                <Stat title='Down Hill' Icon={DifficultyIcon} stat={downHillTrails}/>
                <Stat title='XC' Icon={DifficultyIcon} stat={XCTrails}/>
                <Stat title='Difficulty' Icon={DifficultyIcon} stat={areaDificulty}/>
                <Stat title='Traffic' Icon={RideabilityIcon} stat={traffic}/>
                <Stat title='Current Status' Icon={PavementIcon} stat={currentStatus}/>
            </div>
        </div>
    )
}

function Stat({Icon, title, stat, statAlt}) {
    return(
        <>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-sm text-gray-600'>{title}</h2>
                <div className="flex gap-2 justify-center items-center">
                    <Image
                        src={Icon}
                        alt={"Stat Icon"}
                    />
                    <div className='text-black'>
                        <p>{stat}</p>
                        {statAlt && <span>{statAlt}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}
