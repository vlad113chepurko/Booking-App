import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "./fireBaseConfig";
import type { TMeetings } from "@/types/meetings.types";

async function getAllMeetings() {
  const meetingsCol = collection(db, "Meetings");
  const meetingsSnapshot = await getDocs(meetingsCol);
  const meetingsList = meetingsSnapshot.docs.map(
    (doc) => ({ docId: doc.id, ...doc.data() } as TMeetings & { docId: string })
  );

  return meetingsList;
}

async function addMeetingData(meetingData: TMeetings) {
  try {
    const docRef = await addDoc(collection(db, "Meetings"), meetingData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function deleteMeetingData(meetingId: string) {
  try {
    await deleteDoc(doc(db, "Meetings", meetingId));
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}

export { addMeetingData, getAllMeetings, deleteMeetingData };
