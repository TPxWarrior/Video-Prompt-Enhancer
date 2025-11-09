import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateCinematicPrompt } from './services/geminiService';
import { Footer } from './components/Footer';
import { ExamplePrompts } from './components/ExamplePrompts';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { StylePresetSelector } from './components/StylePresetSelector';

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [style, setStyle] = useState<string>('Default');

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const prompt = await generateCinematicPrompt(userInput, aspectRatio, style);
      setGeneratedPrompt(prompt);
    } catch (err)
      {
      console.error(err);
      setError('Failed to generate prompt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, aspectRatio, style]);
  
  const handleExampleSelect = useCallback((prompt: string) => {
    setUserInput(prompt);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl space-y-8">
          <Header />
          <main className="w-full space-y-6">
            <PromptInput
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AspectRatioSelector
                selectedRatio={aspectRatio}
                onSelect={setAspectRatio}
                isLoading={isLoading}
              />
              <StylePresetSelector
                selectedStyle={style}
                onSelect={setStyle}
                isLoading={isLoading}
              />
            </div>
            <ExamplePrompts onSelect={handleExampleSelect} isLoading={isLoading} />
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {generatedPrompt && <ResultDisplay prompt={generatedPrompt} />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;