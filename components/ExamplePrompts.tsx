import React from 'react';

const examples = [
  'A majestic lion in a snowy forest',
  'A futuristic city skyline at dusk',
  'A lone astronaut discovering an alien artifact',
  'A secret underwater city of glowing beings',
  'A steampunk airship navigating a storm',
  'A peaceful, magical forest with floating islands',
];

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  isLoading: boolean;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelect, isLoading }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-3">Or try one of these:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => onSelect(example)}
            disabled={isLoading}
            className="px-3 py-1.5 text-sm text-purple-300 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};