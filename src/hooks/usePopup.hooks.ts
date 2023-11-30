import { useEffect, useState } from "react";


export type Toast = {
    id: number;
    message: string;
    type: string;
    countdown: number;
  };
  

export const usePopup = () => {
    const [toasts, setToasts] = useState<Toast[]>([])

    function showToast(type: string, message: string) {
        const newToast = {
            id: Date.now(),
            type,
            message,
            countdown: 3,
          };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        const countdownInterval = setInterval(() => {
            setToasts((prevToasts) =>
              prevToasts.map((t) =>
                t.id === newToast.id
                  ? { ...t, countdown: Math.max(t.countdown - 1, 0) }
                  : t
              )
            );
          }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval)
            setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
        }, 4000);
    }

    // Handle the close action, clearing the timeout
    const handleClose = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    };

    return { showToast, handleClose, toasts }
}
