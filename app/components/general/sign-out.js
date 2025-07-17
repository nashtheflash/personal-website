'use client';

import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { useAuth } from "@/lib/firebase";
import { auth } from "@/firebase";
import router from "next/router";

export const SignOut = () => {
    const { user } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            router.push("/")
            await signOut(auth)
            console.log("User signed out")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    if (!user) {
        return null // Don't display the sign out button if the user is not logged in
    }

    return (
        <button
            onClick={handleSignOut}
            className="text-indigo-900 text-2xl"
        >
            Sign Out
        </button>
    )
}
