import { create } from "zustand";
import type { TMeetings } from "@/types/meetings.types";

type MeetingsState = {
  meetings: TMeetings[];
  setMeetings: (meetings: TMeetings[]) => void;
  removeMeeting?: (docId: string) => void;
};

export const useMeetings = create<MeetingsState>((set) => ({
  meetings: [],
  setMeetings: (meetings: TMeetings[]) => set({ meetings }),
  removeMeeting: (docId: string) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.docId !== docId),
    })),
}));
