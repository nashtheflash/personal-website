'use server'

import { getAllUsers as gAU } from "@/lib/firebase/firestore"
import { getUser as gU } from "@/lib/firebase/firestore"
import { getUserTenant as gUT } from "@/lib/firebase/firestore"
 
import { addUser as aU } from "@/lib/firebase/firestore"

//GET DATA
export async function getAllUsers() {
    const allUsers = await gAU()
    return allUsers
}

export async function getUser(email) {
    const user = await gU(email)
    return user
}

export async function getUserTenant(email) {
    const userTenantId = await gUT(email)
    return userTenantId
}

//CREATE DATA
export async function addUser(userData) {
    const { first_name, last_name, email, tenant } = userData;
    const newUser = await aU(first_name, last_name, email, tenant);

}
