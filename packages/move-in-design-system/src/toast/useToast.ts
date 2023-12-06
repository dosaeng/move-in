import { useIonToast } from "@ionic/react";
import { toastStyle } from "./Toast";

const useToast = () => {
  const [present, dismiss] = useIonToast();

  return {
    present: (message: string, duration?: number) => {
      return present({
        message,
        duration,
        cssClass: toastStyle
      })
    },
    dismiss,
  }
}

export default useToast;
