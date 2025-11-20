import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import type { TBooking } from "@/types/booking.types";
import { db } from "./fireBaseConfig";
async function addBookingData(bookingData: TBooking) {
  try {
    const docRef = await addDoc(collection(db, "Bookings"), bookingData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getBookingData() {
  try {
    const querySnapshot = await getDocs(collection(db, "Bookings"));
    const bookings: TBooking[] = [];
    querySnapshot.forEach((doc: any) => {
      bookings.push({ docId: doc.id, ...doc.data() } as TBooking);
    });
    return bookings;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}

async function removeBookingData(bookingId: string) {
  try {
    await deleteDoc(doc(db, "Bookings", bookingId));
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}
async function updateBookingData(booking: TBooking) {
  try {
    if (!booking.docId) throw new Error("Booking ID is missing");
    await updateDoc(doc(db, "Bookings", booking.docId), booking);
  } catch (e) {
    console.error("Error updating booking: ", e);
  }
}

export { addBookingData, getBookingData, removeBookingData, updateBookingData };
