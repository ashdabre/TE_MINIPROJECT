import { Component } from '../types';
import { StyleSheet } from 'react-native-web';
import { generateStyles } from './styleGenerator';
import { parsePrompt } from './promptParser';
import { generateUIComponent } from './componentGenerator';

export function generateComponent(prompt: string): Component {
  const { type, elements, colors, layout } = parsePrompt(prompt.toLowerCase());
  const styles = generateStyles(colors, layout);
  
  
  const component = generateUIComponent(type, elements, styles);
  
  return {
    preview: component.jsx,
    code: component.code
  };
}