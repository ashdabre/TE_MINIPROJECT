interface ParsedPrompt {
    type: string;
    elements: string[];
    colors: string[];
    layout: string;
  }
  
  export function parsePrompt(prompt: string): ParsedPrompt {
    const types = ['login', 'signup', 'profile', 'dashboard', 'list', 'form'];
    const elements = ['input', 'button', 'text', 'image', 'card', 'header'];
    const colors = ['blue', 'green', 'red', 'purple', 'indigo', 'gray'];
    const layouts = ['centered', 'grid', 'list', 'split'];
  
    const result: ParsedPrompt = {
      type: 'default',
      elements: [],
      colors: [],
      layout: 'centered'
    };
  
    types.forEach(type => {
      if (prompt.includes(type)) {
        result.type = type;
      }
    });
  
    
    elements.forEach(element => {
      if (prompt.includes(element)) {
        result.elements.push(element);
      }
    });
  
    
    colors.forEach(color => {
      if (prompt.includes(color)) {
        result.colors.push(color);
      }
    });
  
    
    layouts.forEach(layout => {
      if (prompt.includes(layout)) {
        result.layout = layout;
      }
    });
  
    return result;
  }