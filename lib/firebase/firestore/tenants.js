import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function getAllTenants() {
    const tenants = [];
    const querySnapshot = await getDocs(collection(db, "tenants"));

    querySnapshot.forEach((doc) => {
        tenants.push(doc.data());
    });

    return tenants;
}
