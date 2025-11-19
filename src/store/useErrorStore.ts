import { create } from 'zustand';

interface ErrorState {
  errorMessage: string[] | null;
  isError: boolean;
  setErrorMessage: (message: string[] | null) => void;
  setIsError: (isError: boolean) => void;
  clearErrorMessage: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  isError: false,
  setErrorMessage: (message) => set({ errorMessage: message }),
  setIsError: (isError) => set({ isError }),
  clearErrorMessage: () => set({ errorMessage: null }),
}));