import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onGenerate(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
          Describe your UI
        </label>
        <div className="relative">
          <textarea
            id="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Create a login screen with email and password inputs, and a sign in button"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Wand2 className="h-4 w-4 mr-2" />
        Generate UI
      </button>
    </form>
  );
};