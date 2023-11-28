import { db, auth } from "../Model/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export class User {
  constructor({ username, bio, posts, id }) {
    this.username = username;
    this.bio = bio;
    this.posts = posts;
    this.id = id;
  }

  static async getUserProperty(userId, property) {
    if (!userId) {
      console.log("userId is undefined");
      return;
    }
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data()[property];
    } else {
      console.log("No such document!");
      return null;
    }
  }

  static async addPostsToUser(username, userID) {
    const postsCollectionRef = collection(db, "posts");
    const q = query(postsCollectionRef, where("postUser", "==", username));
    const querySnapshot = await getDocs(q);
    const userPosts = querySnapshot.docs.map((doc) => doc.id);

    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, { posts: userPosts });
  }

  static async updateUserInDatabase(userId, username, bio) {
    if (!userId) {
      console.log("userId is undefined");
      return;
    }
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await setDoc(userDocRef, {
        ...userDocSnap.data(),
        username: username,
        bio: bio,
      });
      alert("Profile updated!");
    } else {
      console.log("No such document!");
    }
  }

  static async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error(error);
    }
  }

  static async createUser(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
        });
      }
      return userCredential.user;
    } catch (error) {
      console.error(error);
    }
  }
}
