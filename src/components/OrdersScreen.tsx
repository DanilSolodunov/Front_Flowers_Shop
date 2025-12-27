import { useEffect } from 'react';
import { ArrowLeft, Package, Calendar, CheckCircle, Clock, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'pending';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  address: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-123456',
    date: '2024-01-15',
    status: 'delivered',
    total: 4500,
    items: [
      { name: 'Red Roses', quantity: 2, price: 1200 },
      { name: 'White Lilies', quantity: 1, price: 1800 },
      { name: 'Mixed Bouquet', quantity: 1, price: 2500 },
    ],
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-123457',
    date: '2024-01-18',
    status: 'shipped',
    total: 2400,
    items: [
      { name: 'Pink Tulips', quantity: 2, price: 1200 },
    ],
    address: '456 Oak Ave, Los Angeles, CA 90001'
  },
  {
    id: 'ORD-123458',
    date: '2024-01-20',
    status: 'processing',
    total: 3700,
    items: [
      { name: 'Yellow Roses', quantity: 1, price: 1200 },
      { name: 'Spring Bouquet', quantity: 1, price: 2500 },
    ],
    address: '789 Pine Rd, Chicago, IL 60601'
  },
  {
    id: 'ORD-123459',
    date: '2024-01-22',
    status: 'pending',
    total: 1800,
    items: [
      { name: 'White Lilies', quantity: 1, price: 1800 },
    ],
    address: '321 Elm St, Houston, TX 77001'
  }
];

const statusConfig = {
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-blue-100 text-blue-800',
    icon: Truck
  },
  processing: {
    label: 'Processing',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  pending: {
    label: 'Pending',
    color: 'bg-gray-100 text-gray-800',
    icon: Package
  }
};

export function OrdersScreen({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Пожалуйста, войдите в систему</h2>
          <p className="text-gray-600 mb-6">Для просмотра ваших заказов необходимо войти в систему</p>
          <Button onClick={onBack} className="bg-pink-500 hover:bg-pink-600">
            Вернуться в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Мои заказы</h1>
      </div>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Заказов пока нет</h2>
          <p className="text-gray-600 mb-6">Начните покупки, чтобы увидеть свои заказы здесь</p>
          <Button onClick={onBack} className="bg-pink-500 hover:bg-pink-600">
            Начать покупки
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            
            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={statusConfig[order.status].color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Заказанные товары:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>₽{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Итого:</span>
                      <span className="font-bold text-lg text-pink-600">
                        ₽{order.total}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{order.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {/* <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button> */}
                    {order.status === 'delivered' && (
                      <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600">
                        Повторить заказ
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}