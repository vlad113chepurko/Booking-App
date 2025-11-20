import "./MeetingRooms.css";
import { ui } from "@/components/ui/index";
import { useEffect, useState } from "react";
import { useMeetings } from "@/store/useMeetings";
import { useSuccessStore } from "@/store/useSuccessStore";
import {
  getAllMeetings,
  deleteMeetingData,
} from "@/firebase/fireBaseMeetings.service";
import MeetingModal from "./MeetingModal";
import MeetingUpdateModal from "./MeetingUpdateModal";
import type { TMeetings } from "@/types/meetings.types";
export default function MeetingRooms() {
  const { setIsSuccess, setSuccessMessage, setSuccessTitle } =
    useSuccessStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<TMeetings | null>(
    null
  );
  const { setMeetings, meetings, removeMeeting } = useMeetings();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const data = await getAllMeetings();
        setMeetings(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetings();
  }, [setMeetings]);

  function handleRemoveMeeting(id: string) {
    deleteMeetingData(id).then(() => {
      removeMeeting && removeMeeting(id);
    });

    setSuccessTitle("Meeting Deleted");
    setSuccessMessage("The meeting has been deleted successfully.");
    setIsSuccess(true);
  }

  const handleUpdateClick = (meeting: TMeetings) => {
    setSelectedMeeting(meeting);
    setIsModalUpdateOpen(true);
  };

  return (
    <div className="meeting">
      <MeetingModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      <MeetingUpdateModal
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        isModalUpdateOpen={isModalUpdateOpen}
        meetingData={selectedMeeting!}
      />
      <div>
        {isLoading ? null : (
          <ui.Button
            className="mb-4 cursor-pointer"
            variant="default"
            onClick={() => setIsModalOpen(true)}
          >
            Add Meeting
          </ui.Button>
        )}
        {isLoading ? (
          <ui.Spinner className="size-20" />
        ) : (
          <ul className="flex flex-row justify-center gap-5 flex-wrap">
            {meetings.map((meeting) => (
              <li
                key={meeting.docId}
                className="mb-2 p-4 border rounded min-w-100"
              >
                <h3 className="text-lg font-bold">{meeting.title}</h3>
                <p>{meeting.description}</p>
                <ui.Button
                  onClick={() => handleRemoveMeeting(meeting.docId)}
                  variant="destructive"
                  className="mt-2 mr-2 cursor-pointer"
                >
                  Delete
                </ui.Button>
                <ui.Button
                  onClick={() => handleUpdateClick(meeting)}
                  variant="default"
                  className="mt-2 cursor-pointer"
                >
                  Update
                </ui.Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
