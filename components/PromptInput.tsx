
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-1.5 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow duration-200">
        <label htmlFor="idea-input" className="sr-only">What's the video idea?</label>
        <textarea
            id="idea-input"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="What's the video idea? (e.g., 'a cat in a library')"
            className="w-full h-28 p-4 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
            disabled={isLoading}
        />
        <div className="flex justify-end p-2">
            <button
                onClick={onSubmit}
                disabled={isLoading || !value.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-200"
            >
                <SparklesIcon className="w-5 h-5" />
                <span>{isLoading ? 'Generating...' : 'Generate Scene'}</span>
            </button>
        </div>
    </div>
  );
};
