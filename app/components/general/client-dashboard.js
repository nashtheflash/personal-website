'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";

import { AddUserModal } from './';

import { useServerAuth, useAuthenticatedApi, useIdToken } from '@/lib/firebase/auth-hooks';

//IMGS
import companyCoverPhoto from '@/public/tune-dashboard-photo.jpg'
import moreExposureMan from '@/public/more-exposure-man.png'
import nashBrownsHokusaiLogo from '@/public/hokusai-nashbrowns-logo.png'

//FONTS
import { didot } from "@/lib/fonts";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faStrava,
    faYoutube,
    faInstagram,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';

import { 
    faUpRightFromSquare,
} from '@awesome.me/kit-237330da78/icons/classic/light'

import { 
    faComputerMouse,
} from '@awesome.me/kit-237330da78/icons/classic/regular'


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
            <div className='flex justify-end items-center w-full'>
                <Link href='/partners/users' className='btn btn-ghost'>Manage Users</Link>
            </div>
            <div className='flex justify-between items-center gap-5 w-full p-10'>
                <div className='flex justify-center items-center w-1/2'>
                    <Image
                        src={companyCoverPhoto}
                        alt='Nash Borowns Logo Long'
                        width={500}
                        height={750}
                        className='rounded-xl'
                    />
                </div>
                <div className='w-1/2 h-full flex flex-col gap-3 justify-center items-center'>
                    <h2 className={`text-2xl text-bold ${didot.className} text-indigo-900`}>Total Brand Exposure</h2>
                    <Stats/>
                    <div className='relative flex flex-col w-full h-56'>
                            <Image
                                src={moreExposureMan}
                                alt={"Artical Featured Image"}
                                style={{ objectFit: 'cover', margin: '0' }} // navbar, lineheight, paddding, padding, padding?
                                fill={true}
                            />
                    </div>
                    <button className='btn w-full'>Order Content</button>
                </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-5 w-full h-fit p-10">
                <Videos videos={videos}/>
                <Articles articles={articles}/>
            </div>
        </div>
    )
}


//TODO: MOVE THIS TO ITS OWN COMPONENT AND USE ON ADMIN DASHBOARD!!!!!
// function AddUserForm() {
//
//     const newUser = () => {
//         const userData = { firstName: 'test', lastName: 'name', email: 'test@nashbrowns.com', tenant: 0};
//         addUser(userData)
//
//         sendEmail({
//             to: ['nashb1323@gmail.com'],
//             from: 'hello@nashbrowns.com',
//             subject: 'just the subject',
//             message_text: 'WANNA JOIN????',
//             message_html: '',
//         }).then(() => {
//                 console.log('Email sent successfully');
//             })
//         console.log('EMAIL SENT!!');
//     }
//
//     return(
//         <>
//             <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
//
//                 <label className="label">First Name</label>
//                 <input type="firstname" className="input" placeholder="Semore" />
//
//                 <label className="label">Last Name</label>
//                 <input type="lastname" className="input" placeholder="Butts" />
//
//                 <label className="label">Email</label>
//                 <input type="email" className="input" placeholder="cMOREbutts@now.com" />
//             </fieldset>
//             <div className="justify-end card-actions">
//                 <button className="btn btn-primary" onClick={newUser}>Invite User</button>
//             </div>
//         </>
//     )
// }

// function AddUser() {
//     //good start but needs some help. Proababy should show a message that syas the user has been invited
//
//     return(
//         <>
//             {/* You can open the modal using document.getElementById('ID').showModal() method */}
//             <dialog id="my_modal_3" className="modal">
//                 <div className="modal-box">
//                     <form method="dialog">
//                         {/* if there is a button in form, it will close the modal */}
//                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                     </form>
//                     <h3 className="font-bold text-lg">Add New User</h3>
//                     <form method="dialog">
//                         <AddUserForm/>
//                     </form>
//                 </div>
//             </dialog>
//         </>
//     )
// }

function Videos({videos}) {

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <div className='relative w-full'>
                    <p className={`absolute top-0 right-0 text-sm w-fit ${didot.className} text-indigo-600`}>Last Updated: {getPreviousDay6pmFormatted()}</p>
                    <h2 className={`card-title text-5xl ${didot.className} text-indigo-900`}>Videos</h2>
                </div>
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
                                        <td>
                                            <a href={`https://youtu.be/${video.platform_id}`} target='_blank'>
                                                <div className='flex justify-start items-start gap-1'>
                                                    {video.title} 
                                                    <FontAwesomeIcon icon={faUpRightFromSquare} className='h-2 w-2 text-blue-600' />
                                                </div>
                                            </a>
                                        </td>
                                        <td className='text-center'>
                                            {
                                                video.platform == 'youtube' ? (
                                                    <a href='https://www.youtube.com/@nash_brownss' target='_blank'>
                                                        <FontAwesomeIcon icon={faYoutube} className='w-10 h-10 text-red-600' />
                                                    </a>
                                                ) : <FontAwesomeIcon icon={faTiktok} />}
                                        </td>
                                        <td>{video.format == 'long_form' ? <LongForm/> : <ShortForm/>}</td>
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
                    <div className='flex justify-center items-center w-full mt-5'>
                        <div className="badge badge-outline badge-primary">Show More</div>
                    </div>
                </div>
            </div>
        </div>
    )
}



function Articles({articles}) {
    console.log('from artical comp', articles);

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <div className='relative w-full'>
                    <p className={`absolute top-0 right-0 text-sm w-fit ${didot.className} text-indigo-600`}>Live Data. Refresh page to update.</p>
                    <h2 className={`card-title text-5xl ${didot.className} text-indigo-900`}>Articles</h2>
                </div>
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
                                <th>Post Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            { articles && articles.map((article, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link href={`/blog/articles/${article.platform_id}`} target='_blank'>
                                            <div className='flex justify-start items-start gap-1'>
                                                {article.title} 
                                                <FontAwesomeIcon icon={faUpRightFromSquare} className='h-2 w-2 text-blue-600' />
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex justify-center items-center'>
                                            <Link href='/blog' target='_blank'>
                                                <div className='relative h-10 w-10'>
                                                    <Image
                                                        src={nashBrownsHokusaiLogo}
                                                        alt={"Artical Featured Image"}
                                                        style={{ objectFit: 'cover', margin: '0' }} // navbar, lineheight, paddding, padding, padding?
                                                        fill={true}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{article.type == 'blog' ? <BlogPost/> : <ShortForm/>}</td>
                                    <td>{article.sponsored ? <Sponsored/> : <NotSponsored/> }</td>
                                    <td>{article.views.toLocaleString()}</td>
                                    <td>{formatDateToPrettyString(article.published_at)}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center w-full mt-5'>
                        <div className="badge badge-outline badge-primary">Show More</div>
                    </div>
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
                <div className={`stat-title ${didot.className} text-indigo-900`}>Total Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className={`stat-desc ${didot.className} text-indigo-900`}>21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FontAwesomeIcon icon={faComputerMouse} className='w-7 h-7 font-bold' />
                </div>
                <div className={`stat-title ${didot.className} text-indigo-900`}>Afiliat Clicks</div>
                <div className="stat-value">89%</div>
                <div className={`stat-desc ${didot.className} text-indigo-900`}>31 tasks remaining</div>
            </div>
        </div>
    )
}

function ShortForm() {
    return(
        <div className="badge badge-secondary">
            Short Form
        </div>
    )
}

function LongForm() {
    return(
        <div className="badge badge-info">
            Long Form
        </div>
    )
}

function BlogPost() {
    return(
        <div className="badge badge-info">
            Blog Post
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
        } else if (item.type === 'blog') {
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

function getPreviousDay6pmFormatted() {
  const options = { timeZone: 'America/Anchorage' };
  const now = new Date();

  // Get yesterday in Alaska time
  const anchorageNow = new Date(now.toLocaleString('en-US', options));
  anchorageNow.setDate(anchorageNow.getDate() - 1);
  anchorageNow.setHours(18, 0, 0, 0); // 6 PM

  // Extract parts
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[anchorageNow.getMonth()];
  const day = anchorageNow.getDate();
  const year = anchorageNow.getFullYear();

  // Get ordinal suffix
  function getOrdinal(n) {
    if (n >= 11 && n <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  return `${month} ${day}${getOrdinal(day)} ${year}, 6PM AKST`;
}

