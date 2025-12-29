import { useEffect } from 'react';
import { CheckCircle, ArrowRight, Wallet, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface SuccessScreenProps {
  orderId: string;
  paymentMethod: 'cash' | 'online';
  onBackToCatalog: () => void;
}

export function SuccessScreen({ orderId, paymentMethod, onBackToCatalog }: SuccessScreenProps) {
  return (
    <div className="max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Заказ оформлен!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Номер заказа #{orderId}</p>
            <p className="text-gray-600">Ваш заказ цветов успешно оформлен!</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              {paymentMethod === 'cash' ? (
                <>
                  <Wallet className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Оплата при доставке</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Online перевод</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {paymentMethod === 'cash' 
                ? 'Please have cash ready when your order arrives.'
                : 'Payment has been processed successfully.'
              }
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>📧 Вскоре вы получите подтверждение</p>
            <p>🚚 Курьер приедет в назначенное время</p>
            <p>📱 Вы можете отслеживать статус своего заказа в истории заказов</p>
          </div>

          <Button 
            onClick={onBackToCatalog}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            Продолжить покупки
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}