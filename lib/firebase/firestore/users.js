import { db } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

//GET DATA
export async function getAllUsers() {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });

    return users;
}

export async function getUser(email) {
    let user;

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

export async function getUserTenant(email) {

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        if(!docSnap.data().tenant) {
            return docSnap.data().tenant;
        } else {
            console.log('Tenant Does Not Have ID');
        }

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

//ADD DATA
export async function addUser(firstName, lastName, email, tenant) {
    //create doc
    const userRef = doc(db, 'users', email);
    const snap = await getDoc(userRef);

    //check if doc already exists and error if so
    if (snap.exists()) {
        throw new Error(`Document with ID "${email}" already exists`);

    }

    try {
        await setDoc(userRef, {
            first_name: firstName,
            last_name:  lastName,
            email:      email,
            tenant:     tenant,
        });

        console.log("Document created successfully");
        
        return email
    } catch (err) {
        console.error("Document creation failed:", err);
    }

}

//UPDATE DATA
export async function updateUserTenant(email, tenant) {
    const userRef = doc(db, 'users', email);
    
    try {
        await updateDoc(userRef, {
            tenant: tenant
        });
        
        console.log("User tenant updated successfully");
        return true;
    } catch (err) {
        console.error("Failed to update user tenant:", err);
        throw err;
    }
}
