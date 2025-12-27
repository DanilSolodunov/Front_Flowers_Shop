import { useEffect } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  productName: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, imageUrl, productName, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${productName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this beautiful ${productName}`,
          url: imageUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative max-w-4xl max-h-full w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 rounded-t-lg">
          <h3 className="text-white text-lg font-semibold">{productName}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div 
            className="hidden items-center justify-center"
            id="fallback-image"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">🌸</div>
              <p className="text-white text-lg">Image not available</p>
              <p className="text-gray-400 text-sm mt-2">{productName}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black bg-opacity-50 rounded-b-lg">
          <p className="text-gray-300 text-sm text-center">
            Нажмите на Х чтобы закрыть изображение
          </p>
        </div>
      </div>
    </div>
  );
}