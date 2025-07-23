'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faEnvelope,
    faKey,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

import { didot } from "@/lib/fonts"
import Link from "next/link"

export function Login() {
  const [loginError, setLoginError] = useState(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      router.push("/partners/dashboard") // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error)
      setLoginError(error.message)
    }
  }

  return (
    <div className="mx-auto w-full md:p-10 py-5 md:py-0">
      <h1 className={`text-center text-2xl sm:text-5xl ${didot.className} text-base-content`}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-80">
        <div className="w-full mt-5 sm:mt-8">
          <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-0">
            <div className="space-y-1">
              <label 
                className="group input input-bordered flex items-center gap-2 mb-5 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
              >
                <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Email"
                  className={`text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                />
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label 
                className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
              >
                <FontAwesomeIcon icon={faKey} className='h-5 w-5'/>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                  placeholder="Password"
                  className={`text-base-content placeholder:text-base-content placeholder:${didot.className}`}
                />
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Link href="/partners/forgot-password" className="text-xs text-base-content hover:underline mb-5 pt-1 pl-1">Forgot password?</Link>

            <div className="flex flex-col gap-2 justify-center items-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 w-full font-serif text-base-content border border-indigo-900 bg-opacity-0 bg-black rounded-xl shadow-sm hover:bg-opacity-20 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
              {loginError && (
                <p className="text-red-500 text-sm">{loginError}</p>
              )}
              <div className="divider text-base-content">OR</div>
              <button type="button" className="btn bg-white w-full text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
