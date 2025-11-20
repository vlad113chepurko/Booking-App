import { Controller, useFormContext } from "react-hook-form";
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

export default function SelectMeetings({ name }: { name: string }) {
  const { meetings } = useMeetings();
  const { control } = useFormContext();

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

              {meetings.map((m) => (
                <SelectItem key={m.docId} value={m.docId}>
                  {m.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
