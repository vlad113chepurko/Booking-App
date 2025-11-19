import ReactDOM from "react-dom";
import { useErrorStore } from "@/store/useErrorStore";
import { AlertCircleIcon } from "lucide-react";
import "./Error.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function Error() {
  const errorMessage = useErrorStore((s) => s.errorMessage);
  const isError = useErrorStore((s) => s.isError);
  const clearErrorMessage = useErrorStore((s) => s.clearErrorMessage);

  if (!isError || !errorMessage) return null;

  console.log(isError);

  return ReactDOM.createPortal(
    <div className="error">
      <Alert variant="destructive" className="bg-[#262626] p-20">
        <AlertCircleIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>
          <p>Please success this tabs</p>
          <ul className="list-inside list-disc text-sm">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
      <button
        type="button"
        className="self-end rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        onClick={() => clearErrorMessage()}
      >
        Clear
      </button>
    </div>,
    document.body
  );
}
