import React from 'react';
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
                    <p className="text-sm text-gray-600">₽{item.price} each</p>
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