import { db } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, increment, Timestamp } from "firebase/firestore";

//ADD DATA
//ADD DATA
export async function addContentDocument({
    contentId=undefined,
    title=undefined,
    format=undefined,
    comments=undefined,
    last_updated=undefined,
    likes=undefined,
    platform=undefined,
    platform_id=undefined,
    published_at=undefined,
    sponsored=undefined,
    tenant=undefined,
    type=undefined,
    views=undefined,
}) {
    try {

        const data = filterData({
            title: title || '',
            format: format || '',
            comments: comments || 0,
            last_updated: last_updated || Timestamp.now(),
            likes: likes || 0,
            platform: platform || '',
            platform_id: platform_id || '',
            published_at: published_at || "2025-06-16T05:43:43Z",
            sponsored: sponsored || false,
            tenant: tenant || [],
            type: type || '',
            views: views || 0,
        });

        if(contentId) {
            const contentRef = doc(db, 'content', contentId);
            const snap = await getDoc(contentRef);
            
            if (snap.exists()) {
                throw new Error(`Document with ID "${contentId}" already exists`);
            }

            await setDoc(contentRef, data);
        } else {
            const contentRef = doc(db, 'content');
            await setDoc(contentRef, data);

        }

        return true;
    } catch (err) {
        console.error("Failed to update user tenant:", err);
        throw err;
    }
}

//this should be the basic structure for all collection updates.
//UPDATE DATA
export async function updateContentDocument({
    contentId=undefined,
    format=undefined,
    comments=undefined,
    last_updated=undefined,
    likes=undefined,
    platform=undefined,
    platform_id=undefined,
    published_at=undefined,
    sponsored=undefined,
    type=undefined,
    views=undefined,
}) {
    try {
        if (!contentId) throw new Error(`called updateContentDocument without document id`);


        const data = filterData({
            format: format,
            comments: comments,
            last_updated: last_updated,
            likes: likes,
            platform: platform,
            platform_id: platform_id,
            published_at: published_at,
            sponsored: sponsored,
            type: type,
            views: views,
        });

        const contentRef = doc(db, 'content', contentId);
        await updateDoc(contentRef, data);

        return true;
    } catch (err) {
        console.error("Failed to update user tenant:", err);
        throw err;
    }
}

export async function incrementContentDocumentField({ contentId, incrementAmount, fields }) {
    try {
        if (!contentId) throw new Error(`called incrementContentDocumentField without document id`);
        if (!incrementAmount) throw new Error(`called incrementContentDocumentField without defining an incrementAmount`);
        if (fields.length == 0) throw new Error(`called incrementContentDocumentField without defining an field to increment`);
        
        const data = {}

        fields.forEach((field) => {
            data[field] = increment(incrementAmount)
        });


        const contentRef = doc(db, 'content', contentId);
        await updateDoc(contentRef, data);

        return true;
    } catch (err) {
        console.error("Failed to update content:", err);
        throw err;
    }
}

//TODO: move to utils
// expects all of the fields of a collection to be fed in. fields that have an undifined value will be removed.

function filterData(data) {
    const dataFields= Object.keys(data);
    
    const definedData = dataFields.reduce((acc, field) => {
        // Include the field if it's not undefined or null
        // This allows 0, false, empty arrays, and empty strings
        if (data[field] !== undefined && data[field] !== null) {
            acc[field] = data[field];
        }
        return acc;
    }, {});

    return definedData
}
