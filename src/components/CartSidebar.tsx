import { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!user) {
      toast('Please login to place an order', 'error');
      return;
    }
    onCheckout();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="relative ml-auto w-full max-w-md bg-white shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-pink-600" />
            <h2 className="text-xl font-semibold">Корзина</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Ваша корзина пуста</h3>
              <p className="text-gray-500 mb-4">Добавьте несколько красивых цветов, чтобы начать!</p>
              <Button onClick={onClose} className="bg-pink-500 hover:bg-pink-600">
                Продолжить покупки
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">₽ {item.price} пачка</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Итого:</span>
              <span className="text-2xl font-bold text-pink-600">₽{totalPrice}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-pink-500 hover:bg-pink-600"
              size="lg"
            >
              {user ? 'Оформить заказ' : 'Login to Checkout'}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Продолжить покупки
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


// import React from 'react';
// import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
// import { Button } from './ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { useToast } from '../context/ToastContext';

// interface CartSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCheckout: () => void;
// }

// export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
//   //const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
//   const { items, totalPrice, updateQuantity, removeItem } = useCart();
//   const { user } = useAuth();
//   const { toast } = useToast();

//   const handleCheckout = () => {
//     if (!user) {
//       toast('Please login to checkout', 'error');
//       return;
//     }
//     onCheckout();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 lg:hidden">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       {/* Cart Panel */}
//       <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
//         <Card className="h-full rounded-none border-0">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//             <CardTitle className="flex items-center gap-2">
//               <ShoppingCart className="w-5 h-5 text-pink-600" />
//               Shopping Cart ({items.length})
//             </CardTitle>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="w-4 h-4" />
//             </Button>
//           </CardHeader>
          
//           <CardContent className="flex flex-col h-full pb-20">
//             {items.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
//                 <p className="text-lg font-medium">Your cart is empty</p>
//                 <p className="text-sm">Add some beautiful flowers to get started!</p>
//                 <Button 
//                   onClick={onClose}
//                   className="mt-4 bg-pink-500 hover:bg-pink-600"
//                 >
//                   Continue Shopping
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 overflow-y-auto space-y-4">
//                   {items.map(item => (
//                     <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
//                       <div className="text-3xl">{item.emoji}</div>
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.name}</h4>
//                         <p className="text-sm text-gray-500">₽{item.price}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         >
//                           <Minus className="w-3 h-3" />
//                         </Button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         >
//                           <Plus className="w-3 h-3" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 text-red-500 hover:text-red-600"
//                           onClick={() => removeItem(item.id)}
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="border-t pt-4 space-y-4">
//                   <div className="flex justify-between text-lg font-semibold">
//                     <span>Total</span>
//                     <span className="text-pink-600">₽{totalPrice}</span>
//                   </div>
//                   <Button
//                     onClick={handleCheckout}
//                     className="w-full bg-pink-500 hover:bg-pink-600"
//                     size="lg"
//                   >
//                     {user ? (
//                       <>
//                         Proceed to Checkout
//                         <ArrowRight className="w-4 h-4 ml-2" />
//                       </>
//                     ) : (
//                       <>
//                         Login to Checkout
//                         <ArrowRight className="w-4 h-4 ml-2" />
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }