import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { useForm, FormProvider } from "react-hook-form";
import SelectMeetings from "@/components/Select/SelectMeetings";
import { useSuccessStore } from "@/store/useSuccessStore";
import { useBookingStore } from "@/store/useBooking";
import { useMeetings } from "@/store/useMeetings";
import type { TBooking } from "@/types/booking.types";
import { updateBookingData } from "@/firebase/fireBaseBooking.service";

interface BookingUpdateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookingData: TBooking;
}

export default function BookingUpdateModal({
  isModalOpen,
  setIsModalOpen,
  bookingData,
}: BookingUpdateModalProps) {
  const { setIsSuccess, setSuccessMessage, setSuccessTitle } =
    useSuccessStore();
  const { setBookings } = useBookingStore();
  const { meetings } = useMeetings();

  const methods = useForm<TBooking>({
    defaultValues: bookingData,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TBooking) => {
    const selectedMeeting = meetings.find((m) => m.docId === data.meetingId);
    if (
      !selectedMeeting ||
      (selectedMeeting.isBooked && data.meetingId !== bookingData.meetingId)
    ) {
      setSuccessTitle("Update Failed");
      setSuccessMessage("The selected meeting is already booked.");
      setIsSuccess(true);
      return;
    }

    setBookings((prev) =>
      prev.map((b) => (b.docId === bookingData.docId ? { ...b, ...data } : b))
    );

    await updateBookingData(data);

    setSuccessTitle("Booking Updated");
    setSuccessMessage("The booking has been updated successfully.");
    setIsSuccess(true);
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-100">
        <h2 className="text-xl mb-4">Update Booking</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectMeetings name="meetingId" />
            <ui.Textarea
              {...methods.register("description")}
              placeholder="Meeting Details"
              className="mb-4 mt-4 w-full"
            />
            <ui.Input
              {...methods.register("date")}
              type="date"
              className="mb-4 w-full"
            />
            <ui.Input
              {...methods.register("time")}
              type="time"
              className="mb-4 w-full"
            />
            <div className="flex flex-row justify-between">
              <ui.Button
                variant="default"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <ui.Spinner /> : "Update"}
              </ui.Button>
              <ui.Button
                variant="destructive"
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
