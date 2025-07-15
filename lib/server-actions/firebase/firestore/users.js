'use server'

import { getAllUsers as gAU } from "@/lib/firebase/firestore"
 
export async function getAllUsers() {
    const allUsers = await gAU()
    return allUsers
}

export async function getUser() {

    return null
}
