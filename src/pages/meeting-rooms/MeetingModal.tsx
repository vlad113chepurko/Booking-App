import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { useForm } from "react-hook-form";
import { addMeetingData } from "@/firebase/fireBaseMeetings.service";
import { useMeetings } from "@/store/useMeetings";
import type { TMeetings } from "@/types/meetings.types";

interface MeetingModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

export default function MeetingModal({
  setIsModalOpen,
  isModalOpen,
}: MeetingModalProps) {
  const { setMeetings } = useMeetings();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TMeetings>();

  const onSubmit = async (data: TMeetings) => {
    await addMeetingData(data);
    setMeetings([...useMeetings.getState().meetings, data]);
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-100">
        <h2 className="text-xl mb-4">Add New Meeting</h2>
        <ui.Input
          {...register("title")}
          placeholder="Meeting Title"
          className="mb-4 w-full"
        />
        <ui.Textarea
          {...register("description")}
          placeholder="Meeting Details"
          className="mb-4 w-full"
        />
        <div className="flex flex-row justify-between">
          <ui.Button
            className="cursor-pointer"
            variant="default"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? <ui.Spinner /> : "Save"}
          </ui.Button>
          <ui.Button
            className="cursor-pointer"
            variant="destructive"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </ui.Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
