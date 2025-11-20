import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
}

export const useUsers = create<UsersState>((set) => ({
  users: [],
  selectedUser: null,
  setUsers: (users: User[]) => set({ users }),
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}));
