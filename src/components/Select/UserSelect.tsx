import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useUsers } from "@/store/useUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUsers } from "@/firebase/fireBaseUsers.service";

export default function UserSelect({ name }: { name: string }) {
  const { users, setUsers, setSelectedUser } = useUsers();
  const { control } = useFormContext();

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await getAllUsers();
      setUsers(usersData as any[]);
    }
    fetchUsers();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          value={field.value || ""}
          onValueChange={(value) => {
            field.onChange(value);
            const user = users.find((u) => u.id === value) || null;
            setSelectedUser(user);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Users</SelectLabel>
              {users
                .filter((user) => user.id)
                .map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
