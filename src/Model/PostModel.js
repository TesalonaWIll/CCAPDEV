// PostModel.js
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

export const fetchPostsFromDatabase = async () => {
  const postsCollectionRef = collection(db, "posts");
  const data = await getDocs(postsCollectionRef);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    postTime: doc.data().postTime.toDate().toDateString(),
  }));
};
