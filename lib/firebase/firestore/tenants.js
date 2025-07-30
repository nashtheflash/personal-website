import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { adminDb } from "../admin";

export async function getAllTenants() {
    const tenants = [];
    const querySnapshot = await getDocs(collection(db, "tenants"));

    querySnapshot.forEach((doc) => {
        tenants.push(doc.data());
    });

    return tenants;
}

// Client-side version (for client components)
export async function getTenant(tenantId) {
    const docRef = doc(db, "tenants", tenantId.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error(`Document with ID "${tenantId}" does not exist`);
    }
}

// Server-side version (for server components)
export async function getTenantServer(tenantId) {
    const docRef = adminDb.collection('tenants').doc(tenantId.toString());
    const docSnap = await docRef.get();

    if (docSnap.exists) {
        return docSnap.data();
    } else {
        throw new Error(`Document with ID "${tenantId}" does not exist`);
    }
}
