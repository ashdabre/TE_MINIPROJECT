import React, { useState, useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactflow/dist/style.css';

import Header from '../components/Header';
import Hero from '../components/Hero';
import PromptInput from '../components/PromptInput';
import FlowchartVariations from '../components/FlowchartVariations';
import FlowchartDisplay from '../components/FlowchartDisplay';
import ThemeSelector from '../components/ThemeSelector';
import GetStarted from '../components/GetStarted';

import { 
  generateFlowchart, 
  exportFlowchart,
  flowchartThemes 
} from '../utils/flowchartGenerator';
import { FlowchartVariation, ExportFormat, FlowchartData } from '../types/index1';
import visualize from './flowc';

function Visualize() {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variations, setVariations] = useState<FlowchartVariation[]>([]);
  const [selectedVariationId, setSelectedVariationId] = useState<string>('');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('standard');

  const handlePromptSubmit = useCallback(async (inputPrompt: string) => {
    setPrompt(inputPrompt);
    setIsLoading(true);
    
    try {
      const generatedVariations = await generateFlowchart(inputPrompt);
      setVariations(generatedVariations);
      setSelectedVariationId(generatedVariations[0].id);
    } catch (error) {
      toast.error('Failed to generate flowchart. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleExport = useCallback((format: ExportFormat) => {
    const selectedVariation = variations.find(v => v.id === selectedVariationId);
    if (selectedVariation) {
      exportFlowchart(selectedVariation.data, format);
    }
  }, [variations, selectedVariationId]);

  const handleSaveFlowchart = useCallback((updatedData: FlowchartData) => {
    setVariations(prevVariations => 
      prevVariations.map(variation => 
        variation.id === selectedVariationId 
          ? { ...variation, data: updatedData } 
          : variation
      )
    );
    toast.success('Flowchart updated successfully');
  }, [selectedVariationId]);

  const selectedVariation = variations.find(v => v.id === selectedVariationId);
  const selectedTheme = flowchartThemes.find(t => t.id === selectedThemeId) || flowchartThemes[0];

  // Update theme when variation changes
  useEffect(() => {
    if (selectedVariation) {
      setSelectedThemeId(selectedVariation.theme);
    }
  }, [selectedVariation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Header /> */}
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-lg text-gray-700">Generating flowcharts...</span>
          </div>
        )}

        {!isLoading && variations.length > 0 && (
          <>
            <FlowchartVariations 
              variations={variations} 
              selectedVariation={selectedVariationId}
              onSelectVariation={setSelectedVariationId}
            />
            
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedVariation?.name}</h2>
              <ThemeSelector 
                themes={flowchartThemes}
                selectedTheme={selectedThemeId}
                onSelectTheme={setSelectedThemeId}
              />
            </div>
            
            {selectedVariation && (
              <FlowchartDisplay 
                flowchartData={selectedVariation.data}
                theme={selectedTheme}
                onExport={handleExport}
                onSave={handleSaveFlowchart}
              />
            )}
          </>
        )}
        
        {!isLoading && variations.length === 0 && (
          <GetStarted />
        )}
      </main>
    </div>
  );
}

export default Visualize;



// import axios from 'axios';
// import mermaid from 'mermaid';

// const handlePromptSubmit = useCallback(async (inputPrompt: string) => {
//   setPrompt(inputPrompt);
//   setIsLoading(true);

//   try {
//     // Call Hugging Face API for MermaidJS Flowchart
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/TroyDoesAI/MermaidStable3B',
//       { inputs: inputPrompt },
//       {
//         headers: {
//           Authorization: `Bearer YOUR_HF_API_KEY`,  
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // Mermaid.js syntax output
//     const mermaidCode = response.data.generated_text || '';

//     if (mermaidCode) {
//       setVariations([{ id: 'generated', name: 'Generated Flowchart', data: mermaidCode }]);
//       setSelectedVariationId('generated');
//       mermaid.contentLoaded(); // Render the flowchart
//     } else {
//       toast.error('Failed to generate a valid flowchart.');
//     }
//   } catch (error) {
//     console.error('Error generating flowchart:', error);
//     toast.error('Flowchart generation failed.');
//   } finally {
//     setIsLoading(false);
//   }
// }, []);





// import { useEffect, useRef } from 'react';
// import mermaid from 'mermaid';

// const FlowchartDisplay = ({ flowchartData }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     mermaid.initialize({ startOnLoad: true });
//     mermaid.contentLoaded();
//   }, [flowchartData]);

//   return (
//     <div className="flowchart-container">
//       <pre className="mermaid" ref={chartRef}>
//         {flowchartData}
//       </pre>
//     </div>
//   );
// };

// export default FlowchartDisplay;
