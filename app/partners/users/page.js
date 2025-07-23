'use client'

import { useEffect, useState } from "react";
import { AddUserModal } from '@/app/components/general';
import { useAggressiveAuth } from '@/lib/firebase';
import { useServerAuth, useAuthenticatedApi, useIdToken } from '@/lib/firebase/auth-hooks';

//FONTS
import { didot } from "@/lib/fonts";
import { RequireAuth } from '@/app/components/auth';



export default function Users() {
    const { serverTenant, hasValidTenant } = useServerAuth();
    const makeAuthenticatedRequest = useAuthenticatedApi();

    const [users, setUsers] = useState();
    const [reloadUser, setReloadUser] = useState(false);

    const fetchTenantUsers = async (tenantId) => {
        try {
            const response = await makeAuthenticatedRequest(`/api/${tenantId}/users/get-tenant-users`);
            setUsers(response.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (!hasValidTenant && !serverTenant?.id) return;

        fetchTenantUsers(serverTenant.id);
        setReloadUser(false);

    }, [hasValidTenant, serverTenant?.id, reloadUser]);


    return(
        <RequireAuth>
            <div className="w-full h-fit min-h-screen pr-5 pt-3">
                <div className="flex flex-col justify-start items-center gap-5 w-full h-fit p-10">
                    <UsersTable users={users} setUsers={setUsers} setReloadUser={setReloadUser}/>
                </div>
            </div>
            <AddUserModal modalId='add-user-modal'/>
        </RequireAuth>
    )
}

function UsersTable({users, setReloadUser}) {
    const { user: userAuth } = useAggressiveAuth()
    const { serverTenant } = useServerAuth();
    const makeAuthenticatedRequest = useAuthenticatedApi();


    const handleDeleteUser = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await makeAuthenticatedRequest(
                    `/api/${serverTenant.id}/users/delete-user`,
                    {
                        method: 'DELETE',
                        body: JSON.stringify({ userId })
                    }
                );

                // Refresh the users list
                setReloadUser(true);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return(
        <div className="card w-full bg-base-100 card-lg shadow-sm">
            <div className="card-body">
                <h2 className={`card-title text-5xl ${didot.className} text-base-content`}>Users</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='text-base-content'>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className='text-base-content'>
                            {
                                users && users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td><button className='btn btn-error' onClick={() => handleDeleteUser(user.id)} disabled={userAuth.email == user.email ? 'disabled' : ''}>X</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center w-full mt-5'>
                        <button
                            onClick={()=>document.getElementById('add-user-modal').showModal()}
                            className="badge badge-outline badge-info"
                        >
                            Add New User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
