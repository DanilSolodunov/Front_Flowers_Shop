import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProductList } from './components/ProductList';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutForm } from './components/CheckoutForm';
import { SuccessScreen } from './components/SuccessScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { ImageModal } from './components/ImageModal';
import { Toast } from './components/Toast';
import { mockProducts } from './data/mockProducts';
import { ShoppingCart, User, Settings, Package, LogIn } from 'lucide-react';
import { Button } from './components/ui/button';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

type View = 'catalog' | 'cart' | 'checkout' | 'success' | 'settings' | 'orders';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const { items, totalItems, clearCart } = useCart();
  const { user, login } = useAuth();
  const { toasts } = useToast();

  const handleCheckout = (data: { 
    address: string; 
    comment?: string;
    paymentMethod: 'cash' | 'online';
  }) => {
    // Simulate order creation
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setPaymentMethod(data.paymentMethod);
    clearCart();
    setCurrentView('success');
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
  };

  const handleImageClick = (imageUrl: string, productName: string) => {
    setSelectedImage({ url: imageUrl, name: productName });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Handle ESC key for modal
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('catalog')}
                className="text-pink-600 font-bold text-xl"
              >
                🌸 TAD Flowers
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('orders')}
                  className={currentView === 'orders' ? 'text-pink-600' : ''}
                >
                  <Package className="w-4 h-4" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('cart')}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <DropdownMenuItem onClick={() => setCurrentView('settings')}>
                        <Settings className="w-4 h-4 mr-2" />
                        Настройки
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        // Mock logout
                        window.location.reload();
                      }}>
                        Выход
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => {
                      // Mock login
                      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
                      login(mockUser);
                    }}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Войти
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'catalog' && (
          <ProductList 
            products={mockProducts} 
            onImageClick={handleImageClick}
          />
        )}
        {currentView === 'cart' && (
          <CartSidebar
            isOpen={true}
            onClose={() => setCurrentView('catalog')}
            onCheckout={() => setCurrentView('checkout')}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutForm
            onSubmit={handleCheckout}
            onCancel={() => setCurrentView('cart')}
          />
        )}
        {currentView === 'success' && (
          <SuccessScreen
            orderId={orderId}
            paymentMethod={paymentMethod}
            onBackToCatalog={handleBackToCatalog}
          />
        )}
        {currentView === 'settings' && (
          <SettingsScreen onBack={handleBackToCatalog} />
        )}
        {currentView === 'orders' && (
          <OrdersScreen onBack={handleBackToCatalog} />
        )}
      </main>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage?.url || ''}
        productName={selectedImage?.name || ''}
        onClose={closeImageModal}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => {/* Handled by ToastContext */}}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;