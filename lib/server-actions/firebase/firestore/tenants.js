'use server'

import { getAllTenants as gAT } from "@/lib/firebase/firestore"
 
export async function getAllTenants() {
    const allTenants = await gAT()

    return allTenants
}
