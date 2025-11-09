import React from 'react';

const ratios = [
  { value: '16:9', label: 'Cinematic' },
  { value: '9:16', label: 'Vertical' },
  { value: '4:3', label: 'Classic' },
  { value: '1:1', label: 'Square' },
];

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onSelect: (ratio: string) => void;
  isLoading: boolean;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelect, isLoading }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-gray-400">Aspect Ratio:</p>
      <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-gray-800 p-1.5 border border-gray-700">
        {ratios.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRatio === value
                ? 'bg-purple-600 text-white shadow'
                : 'bg-transparent text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="font-mono mr-1.5">{value}</span>
            <span>({label})</span>
          </button>
        ))}
      </div>
    </div>
  );
};