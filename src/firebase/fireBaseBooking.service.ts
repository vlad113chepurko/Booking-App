import { collection, addDoc, getDocs } from "firebase/firestore";
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
      bookings.push({ id: doc.id, ...doc.data() } as TBooking);
    });
    return bookings;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}

export { addBookingData, getBookingData };
