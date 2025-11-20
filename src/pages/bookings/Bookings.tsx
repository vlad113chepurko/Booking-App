import { ui } from "@/components/ui/index";
import BookingModal from "./BookingModal";
import { useState, useEffect } from "react";
import BookingUpdateModal from "./BookingUpdateModal";
import {
  getBookingData,
  removeBookingData,
} from "@/firebase/fireBaseBooking.service";
import { useBookingStore } from "@/store/useBooking";
import "./Bookings.css";

export default function Bookings() {
  const { setBookings, bookings } = useBookingStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);

  useEffect(() => {
    async function fetchBookings() {
      const bookingData: any = await getBookingData();
      setBookings(bookingData);
      setIsLoaded(true);
    }
    fetchBookings();
  }, [setBookings]);

  function removeBooking(bookingId: string) {
    removeBookingData(bookingId).then(() => {
      setBookings((prev) =>
        prev.filter((booking) => booking.docId !== bookingId)
      );
    });
  }

  function handleEdit(booking: any) {
    setEditingBooking(booking);
    setIsUpdateModalOpen(true);
  }

  return (
    <div className="bookings">
      {!isLoaded ? (
        <div className="flex justify-center py-20">
          <ui.Spinner className="size-20" />
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <ui.Button
              className="cursor-pointer"
              variant="default"
              onClick={() => setIsModalOpen(true)}
            >
              Add Booking
            </ui.Button>
          </div>

          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings available.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((booking) => (
                <li
                  key={booking.docId}
                  className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Meeting ID:</span>{" "}
                    {booking.meetingId}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Date:</span> {booking.date}{" "}
                    | <span className="font-semibold">Time:</span>{" "}
                    {booking.time}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Description:</span>{" "}
                    {booking.description}
                  </p>

                  <ui.Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => removeBooking(booking.docId!)}
                  >
                    Remove
                  </ui.Button>

                  <ui.Button
                    variant="default"
                    className="ml-2"
                    onClick={() => handleEdit(booking)}
                  >
                    Update
                  </ui.Button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <BookingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {editingBooking && (
        <BookingUpdateModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          bookingData={editingBooking}
        />
      )}
    </div>
  );
}
