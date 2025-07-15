"use client"

import { useEffect, useState } from "react";

import { withAuth } from "@/lib/firebase";

import { getAllTenants, getAllUsers, getUserTenant } from "@/lib/server-actions/firebase/firestore";
import { capitalizeFirstLetter } from "@/lib/strings";

import { AdminDashboard } from "@/app/components/general";
import { ClientDashboard } from "@/app/components/general";

async function fetchTenants(setTenants) {
    try {
        const tenantsData = await getAllTenants();
        setTenants(tenantsData);
    } catch (error) {
        console.error('Error fetching tenants:', error);
    }
};

async function fetchUsers(setUsers) {
    try {
        const usersData = await getAllUsers();
        setUsers(usersData);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const Dashboard = ({ params }) => {
    const { slug } = params 

    const [tenants, setTenants] = useState([]);
    const [users, setUsers] = useState([]);

    //Data Fetching
    useEffect(() => {
        fetchTenants(setTenants);
        fetchUsers(setUsers);
    }, [])

    return (
        <div className="min-h-screen">
            <div className="flex flex-col justify-start items-center w-full h-fit bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
                { slug == 'nashbrowns' && <AdminNav tenants={tenants} users={users}/> }
            </div>
            { slug == 'nashbrowns' ? <AdminDashboard /> : <ClientDashboard clientId={slug} /> }
        </div>
    )
}

function AdminNav({ tenants, users }) {

    return(
        <div className='py-3'>
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <select defaultValue="Pick a color" className="select">
                            <option disabled={true}>Select Tennant</option>
                            {tenants && tenants.map((tenant, i) => {
                                return (
                                    <option key={i}>{tenant.display_name}</option>
                                )
                            })}
                        </select>
                    </a>
                </li>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <select defaultValue="Pick a color" className="select">
                            <option disabled={true}>Select User</option>
                            {users && users.map((user, i) => {
                                return (
                                    <option key={i}>{capitalizeFirstLetter(user.first_name) + ' ' + capitalizeFirstLetter(user.last_name)}</option>
                                )
                            })}
                        </select>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default withAuth(Dashboard)
