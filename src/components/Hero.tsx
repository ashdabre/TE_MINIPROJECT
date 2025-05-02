import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">Transform Text into Flowcharts</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Describe any process or workflow, and our AI will generate accurate, 
          detailed flowcharts instantly. Choose from multiple variations and 
          export in various formats.
        </p>
      </div>
    </div>
  );
};

export default Hero;