import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Color: <span className="font-normal text-gray-600">{selectedColor}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={cn(
              'px-4 py-2 text-sm border rounded-sm transition',
              selectedColor === color
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-300 hover:border-gray-900'
            )}
          >
            <span className="flex items-center gap-2">
              {selectedColor === color && <Check size={14} />}
              {color}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};