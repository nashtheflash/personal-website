'use client'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import { BlackTieTitle } from '../blog/section-headers/black-tie';
import {MapIcon, InformationCircleIcon} from '@heroicons/react/24/outline'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faArrowDownToLine,
    faArrowTrendUp,
    faArrowDownLeftAndArrowUpRightToCenter,
    faEye,
    faWater,
    faCompass,
    faArrowDownUpAcrossLine,
} from '@awesome.me/kit-237330da78/icons/classic/light'

import { 
    faRhombus,
    faCircle,
    faStar,
} from '@awesome.me/kit-237330da78/icons/classic/solid'

import 'mapbox-gl/dist/mapbox-gl.css';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MapBox({ data, geoJsonTracks }) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [mapLoaded, setMapLoaded] = useState(false);
    const [lng, setLng] = useState(data.mapStartingLon);
    const [lat, setLat] = useState(data.mapStartingLat);
    const [zoom, setZoom] = useState(data.mapZoom);
    const [currentTracks, setCurrentTracks] = useState(geoJsonTracks);

    useEffect(() => {
        setLng(data.mapStartingLon);
        setLat(data.mapStartingLat);
        setZoom(data.mapZoom);

        //if the data changes all of the layers need to be cleared
        if(mapLoaded) {
            const oldLayers = map.current.getStyle().layers.filter((layer) => layer.source != 'composite' && layer.type == 'line')

            oldLayers.forEach((layer) => {
                map.current.removeLayer(layer.id);
                map.current.removeSource(layer.id);   
            });

            //moves the map to the next location
            map.current.flyTo({
                center: [data.mapStartingLon, data.mapStartingLat],
                zoom: data.mapZoom,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        }

    }, [data])

    useEffect(() => {
        //adds the new layers to the map note: geoJsonTracks is useState so must be updated independantly of data
        if(mapLoaded) {
            setCurrentTracks(geoJsonTracks)
            geoJsonTracks.forEach(track => {
                const layerName = `${track.name}-man-add`;

                map.current.addSource(layerName, {
                    type: 'geojson',
                    data: track.data
                });

                map.current.addLayer({
                    id: layerName,
                    type: 'line',
                    source: layerName,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': track.color ? track.color : '#FFFFFF',
                        'line-width': 4,
                    }
                });

                var popup;

                //mouse over events
                map.current.on('mouseover', layerName, function (e) {
                    popup = new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`<h2>${layerName}</h2>`)
                        .addTo(map.current);

                    map.current.setPaintProperty(layerName, 'line-width', 8); // Set width to 8 on hover
                });

                map.current.on('mouseout', layerName, function (e) {
                    if (popup) popup.remove();
                    map.current.setPaintProperty(layerName, 'line-width', 4); // Set width to 8 on hover
                });
            });
        }
    }, [geoJsonTracks])

    useEffect(() => {
        if (map.current) return; // initialize map only once

        //Base map settings
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });

        //once the map is loaded start drawing the tracks
        map.current.on('load', () => {
            setMapLoaded(true);

            currentTracks.forEach(track => {
                const layerName = track.name;

                map.current.addSource(layerName, {
                    type: 'geojson',
                    data: track.data
                });

                map.current.addLayer({
                    id: layerName,
                    type: 'line',
                    source: layerName,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': track.color ? track.color : '#FFFFFF',
                        'line-width': 4,
                    }
                });

                var popup;

                //mouse over events
                map.current.on('mouseover', layerName, function (e) {
                    popup = new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`<h2>${layerName}</h2>`)
                        .addTo(map.current);

                    map.current.setPaintProperty(layerName, 'line-width', 8); // Set width to 8 on hover
                });

                map.current.on('mouseout', layerName, function (e) {
                    if (popup) popup.remove();
                    map.current.setPaintProperty(layerName, 'line-width', 4); // Set width to 8 on hover
                });
            });
        });
    });

    //used to show and hide layers
    useEffect(() => {
        if (!mapLoaded) return;

        currentTracks.forEach((track) => {
            if (track.active == 1) {
                map.current.setLayoutProperty(track.name, 'visibility', 'visible');
            } else {
                map.current.setLayoutProperty(track.name, 'visibility', 'none');
            }
        });
    }, [currentTracks]);

    return( 
        <div className="w-full p-5 py-12">
            <div className='flex h-[600px] text-black'>
                <MapSideBar trails={data.gpxTracks} setCurrentTracks={setCurrentTracks}/>
                <div ref={mapContainer} className={`map-container h-full w-full`} />
            </div>
            <div className='flex justify-center items-center mt-3 text-black'>
                <button className="btn btn-wide">View Printable Map</button>
            </div>
        </div>
    )
}

function MapSideBar({trails, setCurrentTracks}) {
    return(
        <div className="w-1/4 h-full bg-orange-500 overflow-y-auto overflow-x-hidden">
            <ViewAll setCurrentTracks={setCurrentTracks}/>
            {
                trails && trails.map(trail => {
                    return (
                        <TrailCard key={trail.name} trail={trail} setCurrentTracks={setCurrentTracks}/>
                    )
                })
            }
        </div>
    )
}

function ViewAll({setCurrentTracks}) {
    return(
        <div className="card card-bordered w-full bg-gray-400 card-xs shadow-sm rounded-none">
            <div className="flex justify-center items-center gap-2 h-10">
                <button className="" onClick={() => selectAllTracks(setCurrentTracks)}>View All Trails</button>
                <button 
                    className=""
                    onClick={() => selectAllTracks(setCurrentTracks)}
                >
                    <FontAwesomeIcon icon={faEye} className='h-5 w-5'/>
                </button>
            </div>
        </div>
    )
}

function TrailCard({trail, setCurrentTracks}) {
    return(
        <div className="card card-bordered w-full bg-gray-400 card-xs shadow-sm rounded-none">
            <div className="card-body p-6">
                <h2 className="card-title">
                    {trail.name}
                    <div className="tooltip" data-tip="Trail Color">
                        <FontAwesomeIcon icon={faCircle} className={`h-5 w-5 ${trail.textColor}`}/>
                    </div>
                    <FontAwesomeIcon icon={faRhombus} className={
                        classNames(
                            trail.difficulty == 'paved' ? "w-5 h-5 text-gray-600" :
                                trail.difficulty == 'easy' ? "w-5 h-5 text-green-600" :
                                    trail.difficulty == 'medium' ? "w-5 h-5 text-blue-600" :
                                        trail.difficulty == 'hard' ? "w-5 h-5 text-black" :
                                            trail.difficulty == 'expert' ? "w-5 h-5 text-red-600" :
                                                "w-5 h-5 text-purple-500"
                        )}
                    />
                    <div className="tooltip" data-tip="Download">
                        <FontAwesomeIcon icon={faArrowDownToLine} className='h-5 w-5'/>
                    </div>
                    <div className="tooltip" data-tip="View Only">
                        <button 
                            className=""
                            onClick={() => handleTrackChange(setCurrentTracks, trail.name)}
                        >
                            <FontAwesomeIcon icon={faEye} className='h-5 w-5'/>
                        </button>
                    </div>

                </h2>
                <div className='flex justify-start items-center gap-2'>
                    {
                        trail.oneWay && (
                            <div className="tooltip" data-tip="One Way">
                                <FontAwesomeIcon icon={faCompass} className='h-5 w-5'/>
                            </div>
                        )
                    }
                    {
                        trail.features.includes('jump') && (
                            <div className="tooltip" data-tip="Jumps">
                                <FontAwesomeIcon icon={faArrowTrendUp} className='h-5 w-5'/>
                            </div>
                        )
                    }
                    {
                        trail.features.includes('skinny') && (
                            <div className="tooltip" data-tip="Skinnys">
                                <FontAwesomeIcon icon={faArrowDownLeftAndArrowUpRightToCenter} className='h-5 w-5'/>
                            </div>
                        )
                    }
                    {
                        trail.features.includes('teeter') && (
                            <div className="tooltip" data-tip="Teeter-Totter">
                                <FontAwesomeIcon icon={faArrowDownUpAcrossLine} className='h-5 w-5'/>
                            </div>
                        )
                    }
                    {
                        trail.features.includes('water') && (
                            <div className="tooltip" data-tip="Water Crossing">
                                <FontAwesomeIcon icon={faWater} className='h-5 w-5'/>
                            </div>
                        )
                    }
                </div>
                <p className='text-left'>{trail.description}</p>
            </div>
        </div>
    )
}

// const BikeJumpIcon = ({ className = "", width = 1024, height = 1024, fill = "currentColor" }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 1024 1024"
//     width={width}
//     height={height}
//     className={className}
//     fill={fill}
//   >
//     <path d="M 618,681 L 617,682 L 608,682 L 607,683 L 600,683 L 599,684 L 594,684 L 593,685 L 590,685 L 589,686 L 585,686 L 584,687 L 581,687 L 580,688 L 577,688 L 576,689 L 574,689 L 573,690 L 570,690 L 569,691 L 567,691 L 566,692 L 564,692 L 563,693 L 561,693 L 560,694 L 558,694 L 557,695 L 555,695 L 554,696 L 552,696 L 551,697 L 549,697 L 548,698 L 547,698 L 546,699 L 544,699 L 543,700 L 542,700 L 541,701 L 539,701 L 538,702 L 537,702 L 536,703 L 534,703 L 533,704 L 532,704 L 531,705 L 530,705 L 529,706 L 528,706 L 527,707 L 525,707 L 524,708 L 523,708 L 522,709 L 521,709 L 520,710 L 519,710 L 518,711 L 517,711 L 516,712 L 515,712 L 514,713 L 513,713 L 512,714 L 511,714 L 509,716 L 508,716 L 507,717 L 506,717 L 504,719 L 503,719 L 502,720 L 501,720 L 500,721 L 499,721 L 497,723 L 496,723 L 495,724 L 494,724 L 492,726 L 491,726 L 489,728 L 488,728 L 487,729 L 486,729 L 484,731 L 483,731 L 482,732 L 481,732 L 479,734 L 478,734 L 476,736 L 475,736 L 474,737 L 473,737 L 471,739 L 470,739 L 468,741 L 467,741 L 466,742 L 465,742 L 463,744 L 462,744 L 460,746 L 459,746 L 457,748 L 456,748 L 454,750 L 453,750 L 452,751 L 451,751 L 449,753 L 448,753 L 446,755 L 445,755 L 443,757 L 442,757 L 441,758 L 440,758 L 438,760 L 437,760 L 435,762 L 434,762 L 432,764 L 431,764 L 429,766 L 428,766 L 427,767 L 426,767 L 424,769 L 423,769 L 421,771 L 420,771 L 418,773 L 417,773 L 416,774 L 415,774 L 413,776 L 412,776 L 410,778 L 409,778 L 408,779 L 407,779 L 405,781 L 404,781 L 402,783 L 401,783 L 400,784 L 399,784 L 397,786 L 396,786 L 395,787 L 394,787 L 392,789 L 391,789 L 390,790 L 389,790 L 387,792 L 386,792 L 385,793 L 384,793 L 383,794 L 382,794 L 380,796 L 379,796 L 378,797 L 377,797 L 375,799 L 374,799 L 373,800 L 372,800 L 371,801 L 370,801 L 369,802 L 368,802 L 366,804 L 365,804 L 364,805 L 363,805 L 362,806 L 361,806 L 360,807 L 359,807 L 358,808 L 357,808 L 356,809 L 355,809 L 354,810 L 353,810 L 351,812 L 350,812 L 349,813 L 348,813 L 347,814 L 346,814 L 345,815 L 344,815 L 343,816 L 342,816 L 341,817 L 340,817 L 339,818 L 338,818 L 337,819 L 336,819 L 335,820 L 334,820 L 333,821 L 331,821 L 330,822 L 329,822 L 328,823 L 327,823 L 326,824 L 325,824 L 324,825 L 323,825 L 322,826 L 320,826 L 319,827 L 318,827 L 317,828 L 316,828 L 315,829 L 313,829 L 312,830 L 311,830 L 310,831 L 309,831 L 308,832 L 306,832 L 305,833 L 304,833 L 303,834 L 301,834 L 300,835 L 299,835 L 298,836 L 296,836 L 295,837 L 294,837 L 293,838 L 291,838 L 290,839 L 289,839 L 288,840 L 286,840 L 285,841 L 283,841 L 282,842 L 280,842 L 279,843 L 278,843 L 277,844 L 275,844 L 274,845 L 272,845 L 271,846 L 269,846 L 268,847 L 266,847 L 265,848 L 263,848 L 262,849 L 259,849 L 258,850 L 256,850 L 255,851 L 253,851 L 252,852 L 249,852 L 248,853 L 246,853 L 245,854 L 242,854 L 241,855 L 238,855 L 237,856 L 234,856 L 233,857 L 229,857 L 228,858 L 225,858 L 224,859 L 220,859 L 219,860 L 215,860 L 214,861 L 210,861 L 209,862 L 204,862 L 203,863 L 198,863 L 197,864 L 191,864 L 190,865 L 185,865 L 184,866 L 178,866 L 177,867 L 171,867 L 170,868 L 166,868 L 165,869 L 164,869 L 163,870 L 162,870 L 157,875 L 157,876 L 155,878 L 155,880 L 154,881 L 154,886 L 153,887 L 153,888 L 154,889 L 154,894 L 155,895 L 155,897 L 157,899 L 157,900 L 162,905 L 163,905 L 164,906 L 165,906 L 166,907 L 168,907 L 169,908 L 851,908 L 852,907 L 854,907 L 855,906 L 856,906 L 857,905 L 858,905 L 859,904 L 860,904 L 866,898 L 866,897 L 867,896 L 867,895 L 868,894 L 868,892 L 869,891 L 869,881 L 868,880 L 868,878 L 867,877 L 867,875 L 866,874 L 866,873 L 865,872 L 865,870 L 864,869 L 864,868 L 863,867 L 863,865 L 862,864 L 862,863 L 861,862 L 861,860 L 860,859 L 860,858 L 859,857 L 859,856 L 858,855 L 858,854 L 857,853 L 857,852 L 856,851 L 856,849 L 855,848 L 855,847 L 854,846 L 854,845 L 853,844 L 853,843 L 852,842 L 852,841 L 851,840 L 851,839 L 850,838 L 850,837 L 849,836 L 849,834 L 848,833 L 848,832 L 847,831 L 847,830 L 846,829 L 846,828 L 845,827 L 845,826 L 844,825 L 844,824 L 843,823 L 843,822 L 842,821 L 842,820 L 840,818 L 840,817 L 839,816 L 839,815 L 838,814 L 838,813 L 837,812 L 837,811 L 836,810 L 836,809 L 834,807 L 834,806 L 833,805 L 833,804 L 832,803 L 832,802 L 830,800 L 830,799 L 829,798 L 829,797 L 827,795 L 827,794 L 826,793 L 826,792 L 824,790 L 824,789 L 822,787 L 822,786 L 820,784 L 820,783 L 818,781 L 818,780 L 816,778 L 816,777 L 812,773 L 812,772 L 809,769 L 809,768 L 804,763 L 804,762 L 798,756 L 798,755 L 782,739 L 781,739 L 774,732 L 773,732 L 769,728 L 768,728 L 765,725 L 764,725 L 761,722 L 760,722 L 757,719 L 756,719 L 754,717 L 753,717 L 751,715 L 750,715 L 749,714 L 748,714 L 746,712 L 745,712 L 744,711 L 743,711 L 741,709 L 740,709 L 739,708 L 738,708 L 737,707 L 736,707 L 735,706 L 734,706 L 732,704 L 731,704 L 730,703 L 729,703 L 728,702 L 726,702 L 725,701 L 724,701 L 723,700 L 722,700 L 721,699 L 720,699 L 719,698 L 717,698 L 716,697 L 715,697 L 714,696 L 713,696 L 712,695 L 710,695 L 709,694 L 707,694 L 706,693 L 704,693 L 703,692 L 701,692 L 700,691 L 698,691 L 697,690 L 695,690 L 694,689 L 691,689 L 690,688 L 687,688 L 686,687 L 683,687 L 682,686 L 678,686 L 677,685 L 673,685 L 672,684 L 667,684 L 666,683 L 659,683 L 658,682 L 648,682 L 647,681 Z" />
//   </svg>
// );










function MapSelect({trails, setCurrentTracks}) {
    return(
        <div className="grid grid-cols-3 justify-center justify-items-center items-start gap-1 py-3 text-black">
            <div className='col-span-3'>
                <BlackTieTitle title='TRAILS'/>
            </div>
            <button className="" onClick={() => selectAllTracks(setCurrentTracks)}>All Trails</button>
            {
                trails && trails.map(trail => {
                    return (
                        <button 
                            key={trail.name}
                            className="" 
                            onClick={() => handleTrackChange(setCurrentTracks, trail.name)}
                        >
                            <div className='flex gap-1 justify-center items-center'>
                                {trail.name}
                                <div className={
                                    classNames(
                                        trail.difficulty == 'paved' ? "w-2 h-2 bg-gray-500 transform rotate-45" :
                                            trail.difficulty == 'easy' ? "w-2 h-2 bg-green-500 transform rotate-45" :
                                                trail.difficulty == 'medium' ? "w-2 h-2 bg-blue-500 transform rotate-45" :
                                                    trail.difficulty == 'hard' ? "w-2 h-2 bg-black transform rotate-45" :
                                                        trail.difficulty == 'expert' ? "w-2 h-2 bg-red-500 transform rotate-45" :
                                                            "w-2 h-2 bg-purple-500 transform rotate-45"
                                    )}
                                />
                            </div>
                        </button>
                    )
                })
            }
        </div>
    )
}

const handleTrackChange = (setTrack, activate) => {
    setTrack(allTracks => 
        allTracks.map((track) => ({
            ...track,
            active: track.name == activate ? 1 : 0
        }))
    )
}

const selectAllTracks = (setTrack) => {
    setTrack(allTracks => 
        allTracks.map((track) => ({
            ...track,
            active: 1
        }))
    )
}

// export function MapAction({tracks}) {
//     const selectedTrack = tracks.find((track) => track.active == 1);
//
//     return(
//         <div className="flex justify-center items-center gap-3 py-3 mb-3 text-black">
//             <a href={selectedTrack.url} download>
//                 <button className="btn btn-neutral">
//                     <MapIcon className='w-5 h-5'/>
//                     Download GPX
//                 </button>
//             </a>
//             <button className="btn btn-neutral">
//                 <InformationCircleIcon className='w-5 h-5'/>
//                 Help
//             </button>
//         </div>
//     )
// }
