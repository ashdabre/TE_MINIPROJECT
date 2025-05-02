import React from 'react';
import { View } from 'react-native-web';
import { Component } from '../types';

interface CanvasProps {
  component: Component;
}

export const GCanvas: React.FC<CanvasProps> = ({ component }) => {
  if (!component.preview) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4" style={{ minHeight: '500px' }}>
        <p className="text-gray-500">Enter a prompt to generate UI</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4" style={{ minHeight: '500px' }}>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden" style={{ width: 375, height: 667 }}>
        {component.preview}
      </div>
    </div>
  );
};