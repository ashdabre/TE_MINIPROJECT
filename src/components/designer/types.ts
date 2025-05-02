export interface ComponentStyle {
  // Layout & Position
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  textAlign?: string;
  
  // Appearance
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  opacity?: string;
  
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  
  // Effects
  animation?: string;
  transform?: string;
  boxShadow?: string;
  filter?: string;
  
  // Advanced
  zIndex?: number;
  overflow?: string;
  customCSS?: string;
  
  // Padding & Margin
  padding?: string;
  margin?: string;
  
  // Border
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
}

export interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: ComponentStyle;
}

export interface Page {
  id: number;
  components: Component[];
}

export const COMPONENT_TYPES = [
  // Basic Components
  'Button',
  'Input',
  'Text',
  'Image',
  'Container',
  'Card',
  
  // Layout Components
  'Grid',
  'Flex',
  'Stack',
  'Divider',
  
  // Navigation Components
  'Navbar',
  'Menu',
  'Tabs',
  'Breadcrumb',
  'Pagination',
  
  // Form Components
  'Form',
  'Checkbox',
  'Radio',
  'Select',
  'Textarea',
  'Switch',
  'Slider',
  
  // Feedback Components
  'Alert',
  'Toast',
  'Progress',
  'Spinner',
  'Badge',
  
  // Overlay Components
  'Modal',
  'Drawer',
  'Popover',
  'Tooltip',
  
  // Data Display
  'Table',
  'List',
  'Tree',
  'Timeline',
  'Avatar',
  
  // Media Components
  'Icon',
  'Video',
  'Audio',
  'Carousel',
  
  // Advanced Components
  'DatePicker',
  'ColorPicker',
  'RichText',
  'CodeEditor',
  'Chart'
];

export const ANIMATIONS = [
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

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;