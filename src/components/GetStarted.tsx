import React from 'react';
import { MessageSquare, Palette, Download, Edit } from 'lucide-react';

const GetStarted: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-6">Get Started</h2>
      <p className="text-lg text-gray-600 text-center mb-10">
        Enter a prompt above to generate your first flowchart. You can describe any
        process, decision tree, or workflow and our AI will visualize it with accurate,
        real-world steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">1. Describe</h3>
          <p className="text-gray-600">
            Enter a description of the process you want to visualize
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Palette className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">2. Choose</h3>
          <p className="text-gray-600">
            Select from multiple AI-generated variations
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Edit className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">3. Edit</h3>
          <p className="text-gray-600">
            Customize your flowchart by editing nodes and connections
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Download className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">4. Export</h3>
          <p className="text-gray-600">
            Download or copy your flowchart in various formats
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;