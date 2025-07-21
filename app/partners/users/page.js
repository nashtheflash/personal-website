'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";

import { addUser, sendEmail } from '@/lib/server-actions/firebase/firestore';

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

export default function EditUsers() {
    const { serverTenant, hasValidTenant } = useServerAuth();
    const makeAuthenticatedRequest = useAuthenticatedApi();

    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchTenantUsers = async (tenantId) => {
            try {
                const response = await makeAuthenticatedRequest(
                    `/api/tenant/${tenantId}/users`
                );
                setUsers(response.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };


        if (hasValidTenant && serverTenant?.id) {
            fetchTenantUsers(serverTenant.id);
        }

    }, [hasValidTenant, serverTenant?.id]);


    return(
        <div className="w-full h-fit min-h-screen pr-5 pt-3 bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <div className="flex flex-col justify-start items-center gap-5 w-full h-fit p-10">
                <Users users={users}/>
            </div>
        </div>
    )
}

function Users({users}) {

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <h2 className={`card-title text-5xl ${didot.className} text-indigo-900`}>Users</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>X</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center w-full mt-5'>
                        <div className="badge badge-outline badge-primary">Add New User</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//TODO: MOVE THIS TO ITS OWN COMPONENT AND USE ON ADMIN DASHBOARD!!!!!
function AddUserForm() {

    const newUser = () => {
        const userData = { firstName: 'test', lastName: 'name', email: 'test@nashbrowns.com', tenant: 0};
        addUser(userData)

        sendEmail({
            to: ['nashb1323@gmail.com'],
            from: 'hello@nashbrowns.com',
            subject: 'just the subject',
            message_text: 'WANNA JOIN????',
            message_html: '',
        }).then(() => {
                console.log('Email sent successfully');
            })
        console.log('EMAIL SENT!!');
    }

    return(
        <>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                <label className="label">First Name</label>
                <input type="firstname" className="input" placeholder="Semore" />

                <label className="label">Last Name</label>
                <input type="lastname" className="input" placeholder="Butts" />

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="cMOREbutts@now.com" />
            </fieldset>
            <div className="justify-end card-actions">
                <button className="btn btn-primary" onClick={newUser}>Invite User</button>
            </div>
        </>
    )
}
