import React, { useState } from 'react';
import { Wand2, Code2, Smartphone } from 'lucide-react';
import { GCanvas } from '../genrateui/gcanvas';
import { CodePreview } from '../genrateui/gCodePreview';
import { PromptInput } from '../genrateui/gPromptInput';
import { sampleComponents } from '../types/SampleComponents';

function genr() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [generatedComponent, setGeneratedComponent] = useState(sampleComponents.default);

  const handleGenerate = (prompt: string) => {
    
    const component = Object.entries(sampleComponents).find(([key]) => 
      prompt.toLowerCase().includes(key)
    )?.[1] || sampleComponents.default;
    
    setGeneratedComponent(component);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900"> UI Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <PromptInput onGenerate={handleGenerate} />

          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center px-4 py-2 space-x-2 ${
                    activeTab === 'preview'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center px-4 py-2 space-x-2 ${
                    activeTab === 'code'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Code2 className="h-4 w-4" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            <div className="p-4">
              {activeTab === 'preview' ? (
                <GCanvas component={generatedComponent} />
              ) : (
                <CodePreview code={generatedComponent.code} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default genr;





