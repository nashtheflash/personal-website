'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signOut, confirmPasswordReset } from "firebase/auth"
import { useAuth } from "@/lib/firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope } from '@awesome.me/kit-237330da78/icons/classic/regular'

import { didot } from "@/lib/fonts"

export function ForgotPassword({ mode, oobCode, apiKey, lang }) {
    const searchParams = useSearchParams()
    const newUserEmail = searchParams.get('email')

    const { user } = useAuth()
    const router = useRouter()

    const [signUpError, setSignUpError] = useState(null)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const password = watch("password")

    const onSubmit = async (data) => {
        if(user) await signOut(auth);

        try {
            if (mode === 'resetPassword' && oobCode) {
                // Handle password reset with oobCode
                await confirmPasswordReset(auth, oobCode, data.password);
                setSuccess(true);
                setTimeout(() => {
                    router.push("/partners");
                }, 2000);
            } else {
                // Handle new user signup (existing logic)
                const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, data.password)
                if (!userCredential) throw new Error("User not created")

                router.push("/partners/dashboard") // Navigate to the tenant dashboard
            }
        } catch (error) {
            console.error("Error:", error)
            setSignUpError(error.message)
        }
    }

    // If we have oobCode, show password reset form
    if (mode === 'resetPassword' && oobCode) {
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-3 gap-4 min-w-80"
            >
                <div className="space-y-1">
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input 
                            type="password"
                            {...register("password", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            placeholder="New Password"
                            className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                        />
                    </label>
                    {errors.password && (
                        <p className="text-error-content text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input 
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            placeholder="Confirm New Password"
                            className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                        />
                    </label>
                    {errors.confirmPassword && (
                        <p className="text-error-content text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-2 rounded-md bg-success font-semibold text-lg text-success-content disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Updating..." : "Update Password"}
                </button>
                
                {success && (
                    <p className="text-success text-sm text-center">Password updated successfully! Redirecting to login...</p>
                )}
                
                {signUpError && (
                    <p className="text-error-content text-sm">{signUpError}</p>
                )}
            </form>
        )
    }

    // Default signup form (existing logic)
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-3 gap-4 min-w-80"
        >
            <div className="space-y-1">
                <label 
                    className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                    <input 
                        type="password"
                        {...register("password", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        placeholder="New Password"
                        className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                    />
                </label>
                {errors.password && (
                    <p className="text-error-content text-sm">{errors.password.message}</p>
                )}
            </div>

            <div className="space-y-1">
                <label 
                    className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                    <input 
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your new password",
                            validate: value => value === password || "Passwords do not match"
                        })}
                        placeholder="Confirm New Password"
                        className={`grow text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="text-error-content text-sm">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 rounded-md bg-success font-semibold text-lg text-success-content disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Updating..." : "Update Password"}
            </button>
            
            {signUpError && (
                <p className="text-error-content text-sm">{signUpError}</p>
            )}
        </form>
    )
}

