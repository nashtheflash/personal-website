'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { useAuth } from "@/lib/firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faSignature,
    faPhone,
    faEnvelope,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

import { didot } from "@/lib/fonts"
import { getUser } from "@/lib/server-actions/firebase/firestore"

export function SignUp() {
    const searchParams = useSearchParams()
    const newUserEmail = searchParams.get('email')

    const { user } = useAuth()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signUpError, setSignUpError] = useState(null)
    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()

        if(user) await signOut(auth);

        try {
            //auth does this automatically
            // const userExists = await getUser(newUserEmail)
            // if (userExists) throw new Error("User already exists")

            const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, password)
            if (!userCredential) throw new Error("User not created")

            router.push("/partners/dashboard") // Navigate to the tenant dashboard
        } catch (error) {
            console.error("Error signing up:", error)
            setSignUpError(error.message)
        }
    }

    return (
        <form
            onSubmit={handleSignUp}
            className="flex flex-col p-8 gap-4 text-black min-w-80"
        >
            <label 
                className="group input input-bordered flex items-center gap-2 font-serif text-indigo-900 border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
            >
                <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                <input 
                    type="email" 
                    value={newUserEmail}
                    readOnly
                    placeholder="Email"
                    className={`grow text-indigo-900 placeholder:text-indigo-900 placeholder:${didot.className}`}
                />
            </label>
            <label 
                className="group input input-bordered flex items-center gap-2 font-serif text-indigo-900 border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
            >
                <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`grow text-indigo-900 placeholder:text-indigo-900 placeholder:${didot.className}`}
                />
            </label>
            <label 
                className="group input input-bordered flex items-center gap-2 font-serif text-indigo-900 border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
            >
                <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className={`grow text-indigo-900 placeholder:text-indigo-900 placeholder:${didot.className}`}
                />
            </label>
            <button
                type="submit"
                className="p-2 rounded-sm bg-green-500 font-semibold text-lg text-white"
            >
                Sign Up
            </button>
            {signUpError && (
                <p className="text-red-500 text-sm">{signUpError.message}</p>
            )}
        </form>
    )
}
