import React from 'react';
import { ArrowLeft, Truck, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface CheckoutFormProps {
  onSubmit: (data: { 
    address: string; 
    comment?: string;
    paymentMethod: 'cash' | 'online';
  }) => void;
  onCancel: () => void;
}

export function CheckoutForm({ onSubmit, onCancel }: CheckoutFormProps) {
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [address, setAddress] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<'cash' | 'online'>('cash');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast('Please login to place an order', 'error');
      return;
    }

    if (!address.trim()) {
      toast('Please enter a delivery address', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({ 
        address: address.trim(), 
        comment: comment.trim(),
        paymentMethod
      });
      setIsSubmitting(false);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-6">Для оформления заказа, пожалуйста, войдите в систему</p>
          <Button 
            onClick={() => {
              // This would normally open a login modal
              window.location.reload();
            }}
            className="bg-pink-500 hover:bg-pink-600"
          >
            Войти и продолжить
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="ml-2"
          >
            На главный экран
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onCancel} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        На главный экран
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-600" />
            Подтверждение заказа
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Общая сумма</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₽{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Итого:</span>
                  <span className="text-pink-600">₽{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4 text-pink-600" />
                Информация о доставке
              </h3>
              
              <div>
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите адрес доставки"
                  required
                />
              </div>

              <div>
                <Label htmlFor="comment">Комментарий для курьера (не обязательно)</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Введите комментарий для курьера, если хотите что-то передать..."
                  rows={3}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Wallet className="w-4 h-4 text-pink-600" />
                Способ оплаты
              </h3>
              
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'cash' | 'online')}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Наличный расчет</div>
                      <div className="text-sm text-gray-500">Оплата при получении</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Online перевод</div>
                      <div className="text-sm text-gray-500">Перевод был/будет на карту</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Payment Method Details */}
              {paymentMethod === 'cash' && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Детали оплаты наличными</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Оплата производится при доставке</li>
                    <li>• Пожалуйста, подготовьте точную сумму</li>
                    <li>• Водитель может выдать сдачу при необходимости</li>
                  </ul>
                </div>
              )}

              {paymentMethod === 'online' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Детали Online перевода</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Заранее обговорите об оплате</li>
                    <li>• После перевода осуществляется доставка</li>
                    <li>• Сообщите курьеру о способе оплаты</li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Имя заказчика:</h3>
              <p className="text-sm text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-pink-500 hover:bg-pink-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    {paymentMethod === 'cash' ? (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        Оформить заказ • ₽{totalPrice}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Оформить заказ • ₽{totalPrice}
                      </>
                    )}
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Назад
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}