// import { createContext, useContext, useState } from 'react';
// import type { ReactNode } from 'react';


// interface Toast {
//   id: string;
//   message: string;
//   type: 'success' | 'error' | 'info';
// }

// interface ToastContextType {
//   toast: (message: string, type?: 'success' | 'error' | 'info') => void;
//   toasts: Toast[];
//   removeToast: (id: string) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const toast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
//     const id = Date.now().toString();
//     const newToast: Toast = { id, message, type };
    
//     setToasts(prev => [...prev, newToast]);
    
//     // Auto remove after 3 seconds
//     setTimeout(() => {
//       removeToast(id);
//     }, 3000);
//   };

//   const removeToast = (id: string) => {
//     setToasts(prev => prev.filter(toast => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{
//       toast,
//       toasts,
//       removeToast
//     }}>
//       {children}
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (context === undefined) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`p-2 rounded shadow text-white ${t.type === 'success' ? 'bg-green-500' : t.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
