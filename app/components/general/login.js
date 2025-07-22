'use client'

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faEnvelope,
    faKey,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

import { didot } from "@/lib/fonts"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setloginError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/partners/dashboard") // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error)
      setloginError(error.message)
    }
  }
    return (
        <div className="mx-auto w-full md:p-10 py-5 md:py-0">
            <h1 className={`text-center text-2xl sm:text-5xl ${didot.className} text-primary-content`}>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="w-full mt-5 sm:mt-8">
                    <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <label 
                            className="group input input-bordered flex items-center gap-2 font-serif text-primary-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                        >
                            <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`text-primary-content placeholder:text-primary-content placeholder:${didot.className}`}
                            />
                        </label>
                        <label 
                            className="group input input-bordered flex items-center gap-2 font-serif text-primary-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                        >
                            <FontAwesomeIcon icon={faKey} className='h-5 w-5'/>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`text-primary-content placeholder:text-primary-content placeholder:${didot.className}`}
                            />
                        </label>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                            <button 
                                type="submit"
                                className="px-6 py-2 w-full font-serif text-primary-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                            >
                                Log In
                            </button>
                            {loginError && (
                                <p className="text-red-500 text-sm">{loginError.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
