import { create } from "zustand";
import type { TMeetings } from "@/types/meetings.types";

type MeetingsState = {
  meetings: TMeetings[];
  setMeetings: (
    meetings: TMeetings[] | ((prev: TMeetings[]) => TMeetings[])
  ) => void;
  removeMeeting: (docId: string) => void;
  updateMeeting: (
    docId: string,
    data: Partial<Omit<TMeetings, "docId">>
  ) => void;
};

export const useMeetings = create<MeetingsState>((set) => ({
  meetings: [],
  setMeetings: (meetings) =>
    set((state) => ({
      meetings:
        typeof meetings === "function" ? meetings(state.meetings) : meetings,
    })),
  removeMeeting: (docId: string) =>
    set((state) => ({
      meetings: state.meetings.filter((m) => m.docId !== docId),
    })),
  updateMeeting: (docId: string, data: Partial<Omit<TMeetings, "docId">>) =>
    set((state) => ({
      meetings: state.meetings.map((m) =>
        m.docId === docId ? { ...m, ...data } : m
      ),
    })),
}));
