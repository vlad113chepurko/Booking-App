import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { useForm } from "react-hook-form";
import { addMeetingData } from "@/firebase/fireBaseMeetings.service";
import { useMeetings } from "@/store/useMeetings";
import type { TMeetings } from "@/types/meetings.types";
import { FormProvider } from "react-hook-form";
import { useSuccessStore } from "@/store/useSuccessStore";
import { useUsers } from "@/store/useUsers";
import UserSelect from "@/components/Select/UserSelect";

interface MeetingModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

export default function MeetingModal({
  setIsModalOpen,
  isModalOpen,
}: MeetingModalProps) {
  const { setMeetings } = useMeetings();
  const { setIsSuccess, setSuccessMessage, setSuccessTitle } =
    useSuccessStore();
  const { selectedUser } = useUsers();

  const methods = useForm<Omit<TMeetings, "docId">>();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: Omit<TMeetings, "docId">) => {
    const docRef = await addMeetingData(data);

    setMeetings([
      ...useMeetings.getState().meetings,
      { ...data, docId: docRef.id, isBooked: false },
    ]);

    setSuccessTitle("Meeting Added");
    setSuccessMessage("The meeting has been added successfully.");
    setIsSuccess(true);

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <FormProvider {...methods}>
        <form className="bg-white p-6 rounded shadow-lg w-100">
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
          <UserSelect name="userId" />

          <p className="mt-4">{selectedUser?.email}</p>

          <div className="flex flex-row justify-between">
            <ui.Button
              className="cursor-pointer mt-4"
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
        </form>
      </FormProvider>
    </div>,
    document.body
  );
}
