import { create } from "zustand";

interface TBooking {
  meetingId: string;
  description: string;
  date: string;
  time: string;
  docId?: string; 
}

interface BookingState {
  bookings: TBooking[];
  setBookings: (
    bookings: TBooking[] | ((prev: TBooking[]) => TBooking[])
  ) => void;
  bookingDate: string;
  bookingTime: string;
  bookingDescription: string;
  setBookingDate: (date: string) => void;
  setBookingTime: (time: string) => void;
  setBookingDescription: (description: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  setBookings: (bookings) =>
    set((state) => ({
      bookings:
        typeof bookings === "function" ? bookings(state.bookings) : bookings,
    })),
  bookingDate: "",
  bookingTime: "",
  bookingDescription: "",
  setBookingDate: (date) => set({ bookingDate: date }),
  setBookingTime: (time) => set({ bookingTime: time }),
  setBookingDescription: (description) =>
    set({ bookingDescription: description }),
}));
