import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export async function getAllTenants() {
    const tenants = [];
    const querySnapshot = await getDocs(collection(db, "tenants"));

    querySnapshot.forEach((doc) => {
        tenants.push(doc.data());
    });

    return tenants;
}

export async function getTenant(tenantId) {

    const docRef = doc(db, "tenants", tenantId.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // console.log("No such document!");
        throw new Error(`Document with ID "${tenantId}" does not exist`);
        // docSnap.data() will be undefined in this case
    }
}
