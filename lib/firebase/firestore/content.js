import { db } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, increment } from "firebase/firestore";

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
        if (data[field]) {
            acc[field] = data[field];
        }
        return acc;
    }, {});

    return definedData
}
