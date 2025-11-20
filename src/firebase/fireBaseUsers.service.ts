import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./fireBaseConfig";

async function getAllUsers() {
  try {
    const usersRef = collection(db, "User");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (e) {
    console.error("Error getting users: ", e);
    return [];
  }
}

export { getAllUsers };
