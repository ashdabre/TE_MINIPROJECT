import React from 'react';
import { Palette } from 'lucide-react';
import { FlowchartTheme } from '../types/index1';

interface ThemeSelectorProps {
  themes: FlowchartTheme[];
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onSelectTheme,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Palette className="h-5 w-5 text-gray-600" />
      <span className="text-gray-700">Theme:</span>
      <div className="flex space-x-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedTheme === theme.id
                ? 'bg-indigo-100 text-indigo-700 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;