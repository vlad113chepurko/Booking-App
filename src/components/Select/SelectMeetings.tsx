import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeetings } from "@/store/useMeetings";
import { getAllMeetings } from "@/firebase/fireBaseMeetings.service";

export default function SelectMeetings({ name }: { name: string }) {
  const [meetingsState, setMeetingsState] = useState<any[]>([]);
  const { control } = useFormContext();

  const { setMeetings } = useMeetings();

  useEffect(() => {
    async function fetchMeetings() {
      const meetingsData = await getAllMeetings();
      setMeetings(meetingsData);
      setMeetingsState(meetingsData);
    }
    fetchMeetings();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a meeting" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meetings</SelectLabel>
              {meetingsState.map((meeting: any) => (
                <SelectItem key={meeting.docId} value={meeting.docId}>
                  {meeting.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
