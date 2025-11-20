import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { useForm, FormProvider } from "react-hook-form";
import SelectMeetings from "@/components/Select/SelectMeetings";
import { useSuccessStore } from "@/store/useSuccessStore";
import { useBookingStore } from "@/store/useBooking";
import { useMeetings } from "@/store/useMeetings";
import type { TBooking } from "@/types/booking.types";
import { addBookingData } from "@/firebase/fireBaseBooking.service";

interface BookingModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

export default function BookingModal({
  setIsModalOpen,
  isModalOpen,
}: BookingModalProps) {
  const { setIsSuccess, setSuccessMessage, setSuccessTitle } =
    useSuccessStore();
  const { setBookings } = useBookingStore();
  const { meetings, setMeetings } = useMeetings();

  const methods = useForm<TBooking>();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: TBooking) => {
    const selectedMeeting = meetings.find((m) => m.docId === data.meetingId);
    if (!selectedMeeting) {
      setSuccessTitle("Booking Failed");
      setSuccessMessage("Selected meeting does not exist.");
      setIsSuccess(true);
      return;
    }

    if (selectedMeeting.isBooked) {
      setSuccessTitle("Booking Failed");
      setSuccessMessage("The selected meeting is already booked.");
      setIsSuccess(true);
      return;
    }

    const alreadyBooked = useBookingStore
      .getState()
      .bookings.some((b) => b.meetingId === data.meetingId);
    if (alreadyBooked) {
      setSuccessTitle("Booking Failed");
      setSuccessMessage("This meeting is already booked.");
      setIsSuccess(true);
      return;
    }

    setMeetings((prev) =>
      prev.map((m) =>
        m.docId === data.meetingId ? { ...m, isBooked: true } : m
      )
    );
    setBookings((prev) => [...prev, { ...data, docId: data.meetingId }]);

    await addBookingData(data);

    setSuccessTitle("Booking Added");
    setSuccessMessage("The booking has been added successfully.");
    setIsSuccess(true);
    setIsModalOpen(false);

    reset();
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Add Booking</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <SelectMeetings name="meetingId" />
            <ui.Textarea
              {...methods.register("description")}
              placeholder="Meeting Details"
              className="w-full"
            />
            <ui.Input
              {...methods.register("date")}
              type="date"
              className="w-full"
            />
            <ui.Input
              {...methods.register("time")}
              type="time"
              className="w-full"
            />
            <div className="flex justify-between">
              <ui.Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? <ui.Spinner /> : "Save"}
              </ui.Button>
              <ui.Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </ui.Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>,
    document.body
  );
}
