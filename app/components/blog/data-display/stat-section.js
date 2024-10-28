import Image from 'next/image';

//Icons
import DistanceIcon from "@/public/mtn-bike-kc/distance.png";
import PavementIcon from "@/public/mtn-bike-kc/pavement.png";
import SingleTrackIcon from "@/public/mtn-bike-kc/singletrack.png";
import RideabilityIcon from "@/public/mtn-bike-kc/rideability.png";
import DifficultyIcon from "@/public/mtn-bike-kc/difficulty.png";

export function BlogStatsSection({
    distanceMiles,
    speedCFS,
    price,
    rating,
}) {

    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit justify-self-center">
            <div className='grid grid-cols-2 h-full items-center justify-items-center sm:grid-cols-3 md:grid-cols-4'>
                {distanceMiles && <Stat title='Distance Total' Icon={DistanceIcon} stat={`${distanceMiles} Mi`} statAlt={`(${(distanceMiles * 1.609).toFixed(2)} KM)`}/>}
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
