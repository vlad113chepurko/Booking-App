import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./fireBaseConfig";
import type { TUser } from "@/types/user.types";

async function addUserData(userData: TUser) {
  try {
    const docRef = await addDoc(collection(db, "User"), userData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function loginUser(email: string, password: string) {
  try {
    const usersRef = collection(db, "User");
    const q = query(
      usersRef,
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Пользователь не найден");
      return null;
    }

    const token = crypto.randomUUID();
    localStorage.setItem("authToken", token);

    const user = querySnapshot.docs[0].data();
    console.log("User logged in:", user);
    return user;
  } catch (e) {
    console.error("Error logging in:", e);
    return null;
  }
}

export { addUserData, loginUser };
