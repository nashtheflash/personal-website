'use server'

import { sendEmail as sE} from "@/lib/firebase/firestore"

//CREATE DATA
export async function sendEmail(emailData) {

    console.log('sending email');

    await sE(emailData);
}
