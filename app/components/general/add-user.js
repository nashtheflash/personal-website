'use client';

import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { addUser, sendEmail } from '@/lib/server-actions/firebase/firestore';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export function AddUserModal({ modalId }) {
    return (
        <>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    {/* Close button form */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add New User</h3>
                    {/* REMOVE the extra form here */}
                    <AddUserForm />
                </div>
            </dialog>
        </>
    );
}

//TODO: MOVE THIS TO ITS OWN COMPONENT AND USE ON ADMIN DASHBOARD!!!!!
function AddUserForm() {
    const { serverTenant } = useServerAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // FIX: Only render the form when serverTenant is available
    if (!serverTenant) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (data) => {
        if (!serverTenant) return;
        if (!data.firstName) return;
        if (!data.lastName) return;
        if (!data.email) return;

        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                tenant: parseInt(serverTenant?.id) // TODO: update if tenant selection is needed
            };
            console.log(userData);
            await addUser(userData);

            await sendEmail({
                to: [data.email],
                from: 'hello@nashbrowns.com',
                subject: 'You’ve been invited!',
                message_text: 'You have been invited to join Nash Browns Media!',
                message_html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                        <h2 style="color: #333;">Welcome to Nash Browns Media 🎉</h2>
                        <p>Click the button below to create your account and view your company's exposure:</p>
                        <p>
                        <a href="${window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                        ? `http://localhost:3000/signup?email=${data.email}`
                        : `https://www.nashbrowns.com/signup?email=${data.email}`}"
                        style="display: inline-block; padding: 12px 20px; color: #fff; background-color: #4f46e5; text-decoration: none; border-radius: 6px; font-weight: bold;"
                        >
                        Join Nash Browns Media
                        </a>
                        </p>
                        <p style="font-size: 0.9em; color: #777;">If you weren’t expecting this email, you can safely ignore it.</p>
                        </div>
                `
                });

            setSuccess(true);
            reset();
        } catch (err) {
            setError('Failed to invite user.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">First Name</label>
                    <input type="text" className="input" placeholder="Semore" {...register('firstName', { required: 'First name is required' })} />
                    {errors.firstName && <span className="text-error text-xs">{errors.firstName.message}</span>}

                    <label className="label">Last Name</label>
                    <input type="text" className="input" placeholder="Butts" {...register('lastName', { required: 'Last name is required' })} />
                    {errors.lastName && <span className="text-error text-xs">{errors.lastName.message}</span>}

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="cMOREbutts@now.com" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                </fieldset>
                <div className="justify-end card-actions mt-2">
                    <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Inviting...' : 'Invite User'}</button>
                </div>
                {success && <div className="text-success mt-2">User invited successfully!</div>}
                {error && <div className="text-error mt-2">{error}</div>}
            </form>
        </>
    )
}

