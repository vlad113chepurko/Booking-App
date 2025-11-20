import ReactDOM from "react-dom";
import { ui } from "@/components/ui/index";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSuccessStore } from "@/store/useSuccessStore";
import { motion } from "framer-motion";

export default function Success() {
  const { isSuccess, successMessage, successTitle } = useSuccessStore();

  if (!isSuccess) return null;

  const MotionAlert = motion(Alert);

  return ReactDOM.createPortal(
    <MotionAlert
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-10 right-10 max-w-100 z-1000 shadow-lg"
      variant="default"
    >
      <CheckCircle2Icon className="mr-2" />
      <div>
        <AlertTitle>{successTitle}</AlertTitle>
        <AlertDescription>{successMessage}</AlertDescription>
      </div>

      <ui.Button
        onClick={() => useSuccessStore.getState().setIsSuccess(false)}
        className="absolute right-1 top-1"
        variant="ghost"
      >
        OK
      </ui.Button>
    </MotionAlert>,
    document.body
  );
}
