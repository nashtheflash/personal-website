import Image from 'next/image';
import hokuasiWordLogo from '@/public/tune-dashboard-photo.jpg'

import { didot } from "@/lib/fonts";

const menuItems = [
    {name: 'Blog', href: '/blog'},
]

export function ClientDashboard({ clientId }) {

    return(

        <div className="w-full h-fit min-h-screen pr-5 pt-3 bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <h1 className='text-right'>Add User</h1>
            <div className='flex justify-between items-start gap-5 w-full p-10'>
                <div className='w-1/2'>
                    <Image
                        src={hokuasiWordLogo}
                        alt='Nash Borowns Logo Long'
                        width={500}
                        height={750}
                        className='rounded-xl'
                    />
                </div>
                <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                    <h2 className='w-fit'>Client Name</h2>
                    <Stats/>
                </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-5 w-full h-fit p-10">
                <Videos/>
                <Articles/>
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

function Videos() {

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
