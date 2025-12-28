// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.tsx'

// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <AuthProvider>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </AuthProvider>
//   </StrictMode>,
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
