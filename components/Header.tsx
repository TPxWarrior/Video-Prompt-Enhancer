
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Video Scene Generator
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Turn your simple ideas into cinematic video prompts.
      </p>
    </header>
  );
};
