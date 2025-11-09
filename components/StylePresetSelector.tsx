import React from 'react';

const styles = [
  { value: 'Default', label: 'Default' },
  { value: 'Cyberpunk', label: 'Cyberpunk' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Film Noir', label: 'Noir' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Anime', label: 'Anime' },
  { value: 'Vintage', label: 'Vintage' },
];

interface StylePresetSelectorProps {
  selectedStyle: string;
  onSelect: (style: string) => void;
  isLoading: boolean;
}

export const StylePresetSelector: React.FC<StylePresetSelectorProps> = ({ selectedStyle, onSelect, isLoading }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-gray-400">Visual Style:</p>
      <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-gray-800 p-1.5 border border-gray-700">
        {styles.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedStyle === value
                ? 'bg-purple-600 text-white shadow'
                : 'bg-transparent text-gray-300 hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};