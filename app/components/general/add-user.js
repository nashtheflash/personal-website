'use client';

import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { addUser, sendEmail } from '@/lib/server-actions/firebase/firestore';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSignature,
    faEnvelope,
} from '@awesome.me/kit-237330da78/icons/classic/regular';
import { didot } from "@/lib/fonts";

export function AddUserModal({ modalId }) {
    return (
        <>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    {/* Close button form */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className={`text-center text-2xl sm:text-5xl ${didot.className} text-base-content`}>Invite User</h3>
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
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [success, setSuccess] = useState(false);
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
                subject: 'You\'ve been invited!',
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
                        <p style="font-size: 0.9em; color: #777;">If you weren't expecting this email, you can safely ignore it.</p>
                        </div>
                `
                });

            setSuccess(true);
            reset();
        } catch (err) {
            setError('Failed to invite user.');
            console.error(err);
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-3 gap-4 min-w-80">
                <div className="space-y-1">
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                        <input 
                            type="text" 
                            {...register('firstName', { required: 'First name is required' })}
                            placeholder="First Name"
                            className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                        />
                    </label>
                    {errors.firstName && (
                        <p className="text-error-content text-sm">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                        <input 
                            type="text" 
                            {...register('lastName', { required: 'Last name is required' })}
                            placeholder="Last Name"
                            className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                        />
                    </label>
                    {errors.lastName && (
                        <p className="text-error-content text-sm">{errors.lastName.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input 
                            type="email" 
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="Email"
                            className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                        />
                    </label>
                    {errors.email && (
                        <p className="text-error-content text-sm">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-2 rounded-md bg-success font-semibold text-lg text-success-content disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Inviting..." : "Invite User"}
                </button>

                {success && (
                    <p className="text-center text-success text-sm">User invited successfully!</p>
                )}
                {error && (
                    <p className="text-center text-error-content text-sm">{error}</p>
                )}
            </form>
        </>
    )
}

