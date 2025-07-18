// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { getFirestore, doc, getDoc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore"; 
// import { db } from "@/firebase";
//
// export async function getFooterItem(postId) {
//     const post = await getPostById(postId);
//     const thumbnail = await getThumbnailImage(post.thumbnail);
//     return {...post, thumbnail}
// }
//
// export async function getThumbnailImage(image) {
//     const storage = getStorage();
//     const imgUrl = await getDownloadURL(ref(storage, `/thumbnails/${image}`)).then((url) => {return url}).catch((error) => {console.log(error)});
//     // const thumbnail = await fetch(imgUrl).then(res => res.arrayBuffer())
//     return imgUrl
// }
//
// export const getPostById = async (id) => {
//     const docRef = doc(db, "posts", id);
//     const docSnap = await getDoc(docRef);
//
//     if (docSnap.exists()) {
//         return docSnap.data();
//     } else {
//         console.log("No such document!");
//     }
// };
