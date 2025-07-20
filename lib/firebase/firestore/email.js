import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

//ADD DATA
export async function sendEmail({
    to=undefined,
    from=undefined,
    subject=undefined,
    message_text=undefined,
    message_html=undefined,
}) {

    try {
        if (!to) throw new Error('sendEmail called without to field');
        // if (!from) throw new Error('sendEmail called without from field');
        if (!subject) throw new Error('sendEmail called without subject');

        const emailRef = collection(db, 'email_queue');


        await addDoc(emailRef, {
            to: [...to],
            from: from || 'hello@nashbrowns.com',
            message: {
                subject: subject,
                text: message_text,
                html: message_html
            }
        });

        return true;
    } catch (err) {
        console.error("Failed to update user tenant:", err);
        throw err;
    }
}

