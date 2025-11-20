import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { useForm } from "react-hook-form";
import { useMeetings } from "@/store/useMeetings";
import { useSuccessStore } from "@/store/useSuccessStore";
import type { TMeetings } from "@/types/meetings.types";
import { useEffect } from "react";

interface Props {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (isOpen: boolean) => void;
  meetingData: TMeetings | null;
}

export default function MeetingUpdateModal({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  meetingData,
}: Props) {
  const { updateMeeting } = useMeetings();
  const { setIsSuccess, setSuccessMessage, setSuccessTitle } =
    useSuccessStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<Omit<TMeetings, "docId">>();

  useEffect(() => {
    if (meetingData) {
      setValue("title", meetingData.title);
      setValue("description", meetingData.description);
    }
  }, [meetingData, setValue]);

  const onSubmit = (data: Omit<TMeetings, "docId">) => {
    if (!meetingData) return;
    updateMeeting(meetingData.docId, data);

    setSuccessTitle("Meeting Updated");
    setSuccessMessage("The meeting has been updated successfully.");
    setIsSuccess(true);

    setIsModalUpdateOpen(false);
  };

  if (!isModalUpdateOpen || !meetingData) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-100">
        <h2 className="text-xl mb-4">Update Meeting</h2>
        <ui.Input
          {...register("title")}
          placeholder="Title"
          className="mb-4 w-full"
        />
        <ui.Textarea
          {...register("description")}
          placeholder="Description"
          className="mb-4 w-full"
        />
        <div className="flex justify-between">
          <ui.Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? <ui.Spinner /> : "Save"}
          </ui.Button>
          <ui.Button
            onClick={() => setIsModalUpdateOpen(false)}
            variant="destructive"
          >
            Close
          </ui.Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
