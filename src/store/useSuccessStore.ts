import { create } from 'zustand';

interface SuccessState {
  successTitle?: string;
  setSuccessTitle: (title: string | undefined) => void;
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  isSuccess: boolean;
  setIsSuccess: (status: boolean) => void;
}

export const useSuccessStore = create<SuccessState>((set) => ({
  successTitle: undefined,
  setSuccessTitle: (title) => set({ successTitle: title }),
  successMessage: null,
  setSuccessMessage: (message) => set({ successMessage: message }),
  isSuccess: false,
  setIsSuccess: (status) => set({ isSuccess: status }),
}));