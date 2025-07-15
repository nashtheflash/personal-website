import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function getAllUsers() {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });

    return users;
}

export async function getUser() {
    const tenants = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        tenants.push(doc.data());
    });

    return null;
}
