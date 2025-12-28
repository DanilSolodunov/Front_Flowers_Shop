// import { createContext, useContext, useState } from 'react';
// import type { ReactNode } from 'react';


// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   emoji: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   totalItems: number;
//   totalPrice: number;
//   addToCart: (product: { id: number; name: string; price: number; emoji: string }) => void;
//   removeItem: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = (product: { id: number; name: string; price: number; emoji: string }) => {
//     setItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
      
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeItem = (id: number) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeItem(id);
//       return;
//     }
    
//     setItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       items,
//       totalItems,
//       totalPrice,
//       addToCart,
//       removeItem,
//       updateQuantity,
//       clearCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: { id: number; name: string; price: number; emoji: string }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: { id: number; name: string; price: number; emoji: string }) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}