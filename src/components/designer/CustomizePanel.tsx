
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "lucide-react";
import { LayoutTab } from "./tabs/LayoutTab";
import { AppearanceTab } from "./tabs/AppearanceTab";
import { TypographyTab } from "./tabs/TypographyTab";
import { EffectsTab } from "./tabs/EffectsTab";
import { AdvancedTab } from "./tabs/AdvancedTab";
import type { ComponentStyle } from "./types";




interface CustomizePanelProps {
  selectedComponent: string | null;
  isPreviewMode: boolean;
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
  onPreviewToggle: () => void;
  onRevertStyles: () => void;
  onApplyStyles: () => void;
  onClose: () => void;
}

const ANIMATIONS = [
  'none',
  'fade-in',
  'slide-in',
  'bounce',
  'rotate',
  'scale',
  'slide-up',
  'slide-down',
  'zoom-in',
  'zoom-out',
  'flip',
  'shake'
];

const ALIGNMENTS = [
  'left',
  'center',
  'right',
  'justify',
  'start',
  'end'
];

const TRANSFORMS = [
  'none',
  'rotate-45',
  'rotate-90',
  'rotate-180',
  'scale-110',
  'scale-125',
  'skew-x',
  'skew-y',
  'translate-x',
  'translate-y'
];

export function CustomizePanel({
  selectedComponent,
  isPreviewMode,
  tempStyles,
  onStyleChange,
  onPreviewToggle,
  onRevertStyles,
  onApplyStyles,
  onClose
}: CustomizePanelProps) {
  const [activeTab, setActiveTab] = useState('layout');

  if (!selectedComponent) return null;

  const tabs = [
    { id: 'layout', label: 'Layout & Position' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'typography', label: 'Typography' },
    { id: 'effects', label: 'Effects' },
    { id: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-lg">
      <div className="p-4 sticky top-0 bg-white z-10 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Customize Component</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 transition-all"
          title="Close Panel"
        >
          ✖
        </button>
      
        <div className="flex gap-2 mb-4">
          <button
            onClick={onPreviewToggle}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              isPreviewMode 
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </button>
          {isPreviewMode && (
            <button
              onClick={onRevertStyles}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Undo Changes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6 h-[calc(100vh-12rem)] overflow-y-auto">
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Position</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">X Position</label>
                  <input
                    type="number"
                    value={tempStyles.x || 0}
                    onChange={(e) => onStyleChange('x', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Y Position</label>
                  <input
                    type="number"
                    value={tempStyles.y || 0}
                    onChange={(e) => onStyleChange('y', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Dimensions</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Width</label>
                  <input
                    type="number"
                    value={tempStyles.width || 100}
                    onChange={(e) => onStyleChange('width', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Height</label>
                  <input
                    type="number"
                    value={tempStyles.height || 100}
                    onChange={(e) => onStyleChange('height', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Alignment</h3>
              <select
                value={tempStyles.textAlign || 'left'}
                onChange={(e) => onStyleChange('textAlign', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {ALIGNMENTS.map(align => (
                  <option key={align} value={align}>
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Background</label>
                  <input
                    type="color"
                    value={tempStyles.backgroundColor || '#ffffff'}
                    onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
                    className="w-full h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Text Color</label>
                  <input
                    type="color"
                    value={tempStyles.textColor || '#000000'}
                    onChange={(e) => onStyleChange('textColor', e.target.value)}
                    className="w-full h-10 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Opacity</h3>
              <input
                type="range"
                min="0"
                max="100"
                value={parseInt(tempStyles.opacity || '100')}
                onChange={(e) => onStyleChange('opacity', `${e.target.value}%`)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Corner Radius</h3>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(tempStyles.borderRadius || '4')}
                onChange={(e) => onStyleChange('borderRadius', `${e.target.value}px`)}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Font</h3>
              <select
                value={tempStyles.fontFamily || 'sans-serif'}
                onChange={(e) => onStyleChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Font Size</h3>
              <input
                type="range"
                min="12"
                max="72"
                value={parseInt(tempStyles.fontSize || '16')}
                onChange={(e) => onStyleChange('fontSize', `${e.target.value}px`)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Font Weight</h3>
              <select
                value={tempStyles.fontWeight || 'normal'}
                onChange={(e) => onStyleChange('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Light</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Animation</h3>
              <select
                value={tempStyles.animation || 'none'}
                onChange={(e) => onStyleChange('animation', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {ANIMATIONS.map(animation => (
                  <option key={animation} value={animation}>
                    {animation.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Transform</h3>
              <select
                value={tempStyles.transform || 'none'}
                onChange={(e) => onStyleChange('transform', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {TRANSFORMS.map(transform => (
                  <option key={transform} value={transform}>
                    {transform.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Shadow</h3>
              <select
                value={tempStyles.boxShadow || 'none'}
                onChange={(e) => onStyleChange('boxShadow', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Z-Index</h3>
              <input
                type="number"
                value={tempStyles.zIndex || 0}
                onChange={(e) => onStyleChange('zIndex', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Overflow</h3>
              <select
                value={tempStyles.overflow || 'visible'}
                onChange={(e) => onStyleChange('overflow', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="scroll">Scroll</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Custom CSS</h3>
              <textarea
                value={tempStyles.customCSS || ''}
                onChange={(e) => onStyleChange('customCSS', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg h-24 font-mono text-sm"
                placeholder="Enter custom CSS..."
              />
            </div>
          </div>
        )}

        <button
          onClick={onApplyStyles}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors mt-6"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}