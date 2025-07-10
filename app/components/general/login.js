'use client'

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setloginError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/partners/test") // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error)
      setloginError(error.message)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
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
        Login
      </button>
      {loginError && (
        <p className="text-red-500 text-sm">{loginError.message}</p>
      )}
    </form>
  )
}

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
// import { 
//     faEnvelope,
//     faKey,
// } from '@awesome.me/kit-237330da78/icons/classic/regular'
//
// export function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loginError, setloginError] = useState(null)
//   const router = useRouter()
//
//   const handleLogin = async (e) => {
//     e.preventDefault()
//     try {
//       await signInWithEmailAndPassword(auth, email, password)
//       router.push("/") // Navigate to the home page
//     } catch (error) {
//       console.error("Error logging in:", error)
//       setloginError(error.message)
//     }
//   }
//     return (
//         <div className="mx-auto w-full md:p-10 py-5 md:py-0">
//             <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
//                 Login
//             </h1>
//             <form onSubmit={handleLogin}>
//                 <div className="w-full mt-5 sm:mt-8">
//                     <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
//                         <label className="input input-bordered flex items-center gap-2">
//                             <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Email"
//                                 className="p-2 rounded-sm"
//                             />
//                         </label>
//                         <label className="input input-bordered flex items-center gap-2">
//                             <FontAwesomeIcon icon={faKey} className='h-5 w-5'/>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Password"
//                                 className="p-2 rounded-sm"
//                             />
//                         </label>
//                         <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
//                             <button 
//                                 type="submit"
//                                 className="btn btn-active btn-primary btn-block"
//                             >
//                                 Log In
//                             </button>
//                             {loginError && (
//                                 <p className="text-red-500 text-sm">{loginError.message}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
