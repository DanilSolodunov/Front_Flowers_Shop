import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onImageClick: (imageUrl: string, productName: string) => void;
}

export function ProductCard({ product, onImageClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardContent className="p-4">
        <div className="relative mb-3">
          {imageError ? (
            <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
              <span className="text-6xl">{product.emoji}</span>
            </div>
          ) : (
            <div 
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => onImageClick(product.imageUrl, product.name)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-pink-600">
            ₽{product.price}
          </span>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="bg-pink-500 hover:bg-pink-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}