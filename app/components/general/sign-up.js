'use client'

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faSignature,
    faPhone,
    faEnvelope,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

import { didot } from "@/lib/fonts"

export function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signUpError, setSignUpError] = useState(null)
    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.push("/") // Navigate to the home page
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    // onChange={(e) => setPassword(e.target.value)}
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
