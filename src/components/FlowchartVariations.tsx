import React from 'react';
import { FlowchartVariation } from '../types/index1';
import { Check } from 'lucide-react';

interface FlowchartVariationsProps {
  variations: FlowchartVariation[];
  selectedVariation: string;
  onSelectVariation: (id: string) => void;
}

const FlowchartVariations: React.FC<FlowchartVariationsProps> = ({
  variations,
  selectedVariation,
  onSelectVariation,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Choose a variation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variations.map((variation) => (
          <div
            key={variation.id}
            className={`flowchart-variation ${
              selectedVariation === variation.id ? 'selected' : ''
            }`}
            onClick={() => onSelectVariation(variation.id)}
          >
            <div className={`p-4 h-48 relative theme-${variation.theme}`}>
              {/* Simplified flowchart preview */}
              <div className="flex items-center justify-center h-full">
                <div className="w-3/4 h-3/4 flex flex-col items-center justify-center">
                  {variation.data.nodes.slice(0, 3).map((node, index) => (
                    <div 
                      key={index}
                      className="w-24 h-8 bg-white border border-gray-300 rounded-md mb-2 flex items-center justify-center text-xs"
                    >
                      {node.data.label.length > 10 
                        ? node.data.label.substring(0, 10) + '...' 
                        : node.data.label}
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedVariation === variation.id && (
                <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="p-3 bg-white border-t border-gray-200">
              <h3 className="font-medium">{variation.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowchartVariations;