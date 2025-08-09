'use server'

import { addIncomingRequest as aIR } from "@/lib/firebase/firestore"

//CREATE DATA
export async function addIncomingRequest(requestData) {
    try {
        console.log('Adding incoming request:', requestData);

        const { email, first_name, last_name, message, phone, type, site } = requestData;

        await aIR({
            email,
            first_name,
            last_name,
            message,
            phone,
            type: type || "work_with_us",
            site: site || "nash_browns"
        });

        console.log('Incoming request added successfully');
        return { success: true };
    } catch (error) {
        console.error('Failed to add incoming request:', error);
        throw error;
    }
}
