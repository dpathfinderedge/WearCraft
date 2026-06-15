import React from 'react';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <button className="text-xs text-gray-600 underline underline-offset-2 hover:text-gray-900">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={cn(
              'px-4 py-3 text-sm font-medium border rounded-sm transition',
              selectedSize === size
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-900'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};