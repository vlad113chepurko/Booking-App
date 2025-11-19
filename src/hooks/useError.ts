import { useErrorStore } from "@/store/useErrorStore";

export const useError = () => {
  const setIsError = useErrorStore((state) => state.setIsError);
  const setErrorMessage = useErrorStore((state) => state.setErrorMessage);

  const handleError = (errors: Record<string, { message?: string }>) => {
    if (errors && Object.keys(errors).length > 0) {
      setIsError(true);
      setErrorMessage(
        Object.values(errors)
          .map((err) => err.message)
          .filter((m): m is string => Boolean(m))
      );
    } else {
      setIsError(false);
      setErrorMessage(null);
    }
  };

  return { handleError };
};
