
import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ResultDisplayProps {
  prompt: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  return (
    <div className="relative bg-gray-800/50 border border-gray-700 rounded-xl shadow-inner p-6">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 text-gray-400 bg-gray-700/50 rounded-lg hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        aria-label="Copy prompt to clipboard"
      >
        <ClipboardIcon className="w-5 h-5" />
      </button>
       <p className="font-mono text-base text-gray-300 leading-relaxed pr-8">
        {prompt}
       </p>
      {copied && (
        <span className="absolute top-3 right-14 text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </div>
  );
};
