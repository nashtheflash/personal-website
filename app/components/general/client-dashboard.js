'use client'

import Image from 'next/image';
import { useEffect, useState } from "react";

import { useServerAuth, useAuthenticatedApi, useIdToken } from '@/lib/firebase/auth-hooks';

import companyCoverPhoto from '@/public/tune-dashboard-photo.jpg'

import { didot } from "@/lib/fonts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faStrava,
    faYoutube,
    faInstagram,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';


export function ClientDashboard() {
    const { serverTenant, hasValidTenant } = useServerAuth();
    const makeAuthenticatedRequest = useAuthenticatedApi();

    const [tenants, setTenants] = useState([]);
    const [videos, setVideos] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log('checking for valid tenant and server tenant');

        if (hasValidTenant && serverTenant?.id) {
            console.log('Fetching tenant dashboard for tenant ID:', serverTenant.id);
            fetchTenantDashboard(serverTenant?.id, setVideos, setArticles, makeAuthenticatedRequest); //change to fetch clientContent
            console.log('dashboard fetched')
        }

    }, [hasValidTenant, serverTenant?.id]);


    return(

        <div className="w-full h-fit min-h-screen pr-5 pt-3 bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <h1 className={`text-right text-md ${didot.className} text-indigo-900`}>Add User</h1>
            <div className='flex justify-between items-start gap-5 w-full p-10'>
                <div className='flex justify-center items-center w-1/2'>
                    <Image
                        src={companyCoverPhoto}
                        alt='Nash Borowns Logo Long'
                        width={500}
                        height={750}
                        className='rounded-xl'
                    />
                </div>
                <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                    <h2 className={`text-2xl text-bold ${didot.className} text-indigo-900`}>Total Brand Exposure</h2>
                    <Stats/>
                </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-5 w-full h-fit p-10">
                <Videos videos={videos}/>
                <Articles articles={articles}/>
            </div>
        </div>
    )
}


function AddUser() {

    return(
        <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Add New User</h2>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    <label className="label">First Name</label>
                    <input type="firstname" className="input" placeholder="Semore" />

                    <label className="label">Last Name</label>
                    <input type="lastname" className="input" placeholder="Butts" />

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="cMOREbutts@now.com" />
                </fieldset>
                <div className="justify-end card-actions">
                    <button className="btn btn-primary">Invite User</button>
                </div>
            </div>
        </div>
    )
}

function Videos({videos}) {

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Videos</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className='text-center'>Platform</th>
                                <th>Type</th>
                                <th>Sponsored</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Post Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                videos && videos.map((video, index) => (
                                    <tr key={index}>
                                        <td><a href={`https://youtu.be/${video.platform_id}`}>{video.title}</a></td>
                                        <td className='text-center'>{video.platform == 'youtube' ? <FontAwesomeIcon icon={faYoutube} /> : <FontAwesomeIcon icon={faTiktok} />}</td>
                                        <td>{video.format == 'long_form' ? 'Long Form' : 'Short Form'}</td>
                                        <td>{video.sponsored ? <Sponsored/> : <NotSponsored/> }</td>
                                        <td>{video.views.toLocaleString()}</td>
                                        <td>{video.likes.toLocaleString()}</td>
                                        <td>{video.comments.toLocaleString()}</td>
                                        <td>{formatDateToPrettyString(video.published_at)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Sponsored() {
    return(
        <div className="badge badge-success">
            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
            Yes
        </div>
    )
}

function NotSponsored() {
    return(
        <div className="badge badge-error">
            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
            No
        </div>
    )
}

function Articles() {

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Articles</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Sponsored</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Post Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Tune M1 Starlink Install</td>
                                <td>Long Form Video</td>
                                <td>No</td>
                                <td>5.6k</td>
                                <td>5</td>
                                <td>1</td>
                                <td>June 21, 2025</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <td>Tune M1 Gravel Travel</td>
                                <td>Short Form Video</td>
                                <td>No</td>
                                <td>5.6k</td>
                                <td>5</td>
                                <td>1</td>
                                <td>June 19, 2025</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <td>Tune M1 Third Brake Light Install</td>
                                <td>Long Form Video</td>
                                <td>No</td>
                                <td>5.6k</td>
                                <td>5</td>
                                <td>1</td>
                                <td>June 18, 2025</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Stats() {

    return(
        <div className="flex">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </div>
                <div className={`stat-title ${didot.className} text-indigo-900`}>Total Likes</div>
                <div className="stat-value text-primary">25.6K</div>
                <div className={`stat-desc ${didot.className} text-indigo-900`}>21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                    </svg>
                </div>
                <div className={`stat-title ${didot.className} text-indigo-900`}>Page Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className={`stat-desc ${didot.className} text-indigo-900`}>21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar avatar-online">
                        <div className="w-16 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                        </div>
                    </div>
                </div>
                <div className={`stat-title ${didot.className} text-indigo-900`}>Tasks Done</div>
                <div className="stat-value">89%</div>
                <div className={`stat-desc ${didot.className} text-indigo-900`}>31 tasks remaining</div>
            </div>
        </div>
    )
}

// TODO: Add to fetch Dashboard and add tenant brand exposer data
// async function fetchTenants(setTenants) {
//     try {
//         const tenantsData = await getAllTenants();
//         setTenants(tenantsData);
//     } catch (error) {
//         console.error('Error fetching tenants:', error);
//     }
// };

const fetchTenantDashboard = async (tenantId, setVideos, setArticles, makeAuthenticatedRequest) => {
    if (!tenantId) return;

    try {
        const data = await makeAuthenticatedRequest(
            `/api/tenant/${tenantId}/dashboard`
        );
        const {videos, articles} = separateByType(data.content);
        console.log(data.content);

        setVideos(videos);
        setArticles(articles);

    } catch (error) {
        console.error('Failed to fetch tenant data:', error);
    }
};

function separateByType(items) {
    const videos = [];
    const articles = [];

    for (const item of items) {
        if (item.type === 'video') {
            videos.push(item);
        } else if (item.type === 'article') {
            articles.push(item);
        }
    }

    // Sort videos by published_at in descending order (most recent first)
    videos.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    // Sort articles by published_at in descending order (most recent first)
    articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    return { videos, articles };
}

function formatDateToPrettyString(isoString) {
    const date = new Date(isoString);

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    const day = date.getDate();
    const year = date.getFullYear();

    const getOrdinal = (n) => {
        if (n >= 11 && n <= 13) return `${n}th`;
        const lastDigit = n % 10;
        if (lastDigit === 1) return `${n}st`;
        if (lastDigit === 2) return `${n}nd`;
        if (lastDigit === 3) return `${n}rd`;
        return `${n}th`;
    };

    return `${month} ${getOrdinal(day)} ${year}`;
}
