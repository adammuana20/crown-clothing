import { createContext, FC, ReactNode, useState, useContext } from 'react'
import PopUp from '../components/ui/popup/PopUp.component';


export type Toast = {
    id: number;
    message: string;
    type: string;
    countdown: number;
};

type ToastContextProps = {
    showToast: (type: string, message: string) => void;
}

// AS THE ACTUAL VALUE YOU WANT TO ACCESS
export const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: FC<{children: ReactNode}> = ({ children }) => {
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

    const value: ToastContextProps = { showToast }

    return <ToastContext.Provider value={value}>
                <PopUp handleClose={handleClose} toasts={toasts} />
                { children }
            </ToastContext.Provider>
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};