'use client'

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 rounded-sm"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 rounded-sm"
      />
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
