import { FlowchartData, ProcessStep, FlowchartVariation, FlowchartTheme } from '../types';

// Sample flowchart themes
export const flowchartThemes: FlowchartTheme[] = [
  {
    id: 'standard',
    name: 'Standard',
    nodeStyles: {
      default: { background: '#ffffff', border: '1px solid #e2e8f0', color: '#1f2937' },
      start: { background: '#e0f2fe', border: '1px solid #7dd3fc', color: '#0c4a6e' },
      process: { background: '#ffffff', border: '1px solid #e2e8f0', color: '#1f2937' },
      decision: { background: '#fef3c7', border: '1px solid #fcd34d', color: '#92400e' },
      end: { background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b' }
    },
    edgeStyles: { stroke: '#94a3b8', strokeWidth: 2 },
    backgroundColor: '#ffffff'
  },
  {
    id: 'dark',
    name: 'Dark',
    nodeStyles: {
      default: { background: '#1f2937', border: '1px solid #4b5563', color: '#f9fafb' },
      start: { background: '#0c4a6e', border: '1px solid #0369a1', color: '#e0f2fe' },
      process: { background: '#1f2937', border: '1px solid #4b5563', color: '#f9fafb' },
      decision: { background: '#78350f', border: '1px solid #92400e', color: '#fef3c7' },
      end: { background: '#7f1d1d', border: '1px solid #991b1b', color: '#fee2e2' }
    },
    edgeStyles: { stroke: '#9ca3af', strokeWidth: 2 },
    backgroundColor: '#111827'
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    nodeStyles: {
      default: { background: '#dbeafe', border: '1px solid #93c5fd', color: '#1e3a8a' },
      start: { background: '#bfdbfe', border: '1px solid #60a5fa', color: '#1e3a8a' },
      process: { background: '#dbeafe', border: '1px solid #93c5fd', color: '#1e3a8a' },
      decision: { background: '#c7d2fe', border: '1px solid #818cf8', color: '#312e81' },
      end: { background: '#e0e7ff', border: '1px solid #a5b4fc', color: '#312e81' }
    },
    edgeStyles: { stroke: '#3b82f6', strokeWidth: 2 },
    backgroundColor: '#eff6ff'
  }
];

// Mock API call to generate flowchart data
export const generateFlowchart = async (prompt: string): Promise<FlowchartVariation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate different variations based on the prompt
  return [
    createFlowchartVariation('standard-flow', 'Standard Flow', prompt, 'standard'),
    createFlowchartVariation('detailed-flow', 'Detailed Flow', prompt, 'dark'),
    createFlowchartVariation('simplified-flow', 'Simplified Flow', prompt, 'blueprint')
  ];
};

// Helper function to create a flowchart variation
const createFlowchartVariation = (
  id: string,
  name: string,
  prompt: string,
  theme: string
): FlowchartVariation => {
  // Generate steps based on the prompt
  const steps = generateStepsFromPrompt(prompt);
  
  // Convert steps to flowchart data
  const flowchartData = convertStepsToFlowchart(steps);
  
  return {
    id,
    name,
    data: flowchartData,
    theme
  };
};

// Generate process steps based on the prompt
const generateStepsFromPrompt = (prompt: string): ProcessStep[] => {
  // This is where you would integrate with an actual AI service
  // For now, we'll use predefined templates based on keywords in the prompt
  
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('user registration') || lowerPrompt.includes('sign up')) {
    return [
      { id: 'start', title: 'Start', description: 'User begins registration process', type: 'start', nextSteps: ['form'] },
      { id: 'form', title: 'Display Registration Form', description: 'Show form with username, email, password fields', type: 'process', nextSteps: ['validate'] },
      { id: 'validate', title: 'Validate Input', description: 'Check if all required fields are filled correctly', type: 'decision', nextSteps: ['email_check', 'form_error'] },
      { id: 'form_error', title: 'Show Error Message', description: 'Display validation errors to the user', type: 'process', nextSteps: ['form'] },
      { id: 'email_check', title: 'Check Email Availability', description: 'Verify if email is already registered', type: 'decision', nextSteps: ['create_account', 'email_error'] },
      { id: 'email_error', title: 'Show Email Error', description: 'Inform user that email is already taken', type: 'process', nextSteps: ['form'] },
      { id: 'create_account', title: 'Create User Account', description: 'Store user information in database', type: 'process', nextSteps: ['send_email'] },
      { id: 'send_email', title: 'Send Confirmation Email', description: 'Send verification email to user', type: 'process', nextSteps: ['success'] },
      { id: 'success', title: 'Registration Complete', description: 'User account created successfully', type: 'end' }
    ];
  } else if (lowerPrompt.includes('coffee') || lowerPrompt.includes('making coffee')) {
    return [
      { id: 'start', title: 'Start', description: 'Begin coffee making process', type: 'start', nextSteps: ['beans'] },
      { id: 'beans', title: 'Select Coffee Beans', description: 'Choose between Arabica or Robusta beans', type: 'process', nextSteps: ['grind'] },
      { id: 'grind', title: 'Grind Coffee Beans', description: 'Grind beans to desired coarseness', type: 'process', nextSteps: ['method'] },
      { id: 'method', title: 'Choose Brewing Method', description: 'Select brewing technique', type: 'decision', nextSteps: ['espresso', 'filter', 'french'] },
      { id: 'espresso', title: 'Espresso Machine', description: 'Use espresso machine to brew', type: 'process', nextSteps: ['serve'] },
      { id: 'filter', title: 'Filter/Drip', description: 'Use filter coffee maker', type: 'process', nextSteps: ['serve'] },
      { id: 'french', title: 'French Press', description: 'Use French press method', type: 'process', nextSteps: ['serve'] },
      { id: 'serve', title: 'Serve Coffee', description: 'Pour into cup and serve', type: 'process', nextSteps: ['additions'] },
      { id: 'additions', title: 'Add Extras', description: 'Add sugar, milk, or other flavors', type: 'decision', nextSteps: ['enjoy', 'enjoy'] },
      { id: 'enjoy', title: 'Enjoy Coffee', description: 'Drink and enjoy the coffee', type: 'end' }
    ];
  } else if (lowerPrompt.includes('customer support') || lowerPrompt.includes('decision tree')) {
    return [
      { id: 'start', title: 'Customer Inquiry', description: 'Customer contacts support', type: 'start', nextSteps: ['issue_type'] },
      { id: 'issue_type', title: 'Identify Issue Type', description: 'Determine the category of the issue', type: 'decision', nextSteps: ['technical', 'billing', 'general'] },
      { id: 'technical', title: 'Technical Issue', description: 'Problem with product functionality', type: 'process', nextSteps: ['troubleshoot'] },
      { id: 'billing', title: 'Billing Issue', description: 'Problem with payment or charges', type: 'process', nextSteps: ['billing_dept'] },
      { id: 'general', title: 'General Inquiry', description: 'Question about products or services', type: 'process', nextSteps: ['knowledge_base'] },
      { id: 'troubleshoot', title: 'Troubleshooting Steps', description: 'Guide customer through basic fixes', type: 'process', nextSteps: ['resolved_check'] },
      { id: 'billing_dept', title: 'Transfer to Billing', description: 'Connect with billing department', type: 'process', nextSteps: ['resolved_check'] },
      { id: 'knowledge_base', title: 'Consult Knowledge Base', description: 'Look up information to answer query', type: 'process', nextSteps: ['resolved_check'] },
      { id: 'resolved_check', title: 'Issue Resolved?', description: 'Check if customer issue is resolved', type: 'decision', nextSteps: ['feedback', 'escalate'] },
      { id: 'escalate', title: 'Escalate Issue', description: 'Transfer to higher support tier', type: 'process', nextSteps: ['resolved_check'] },
      { id: 'feedback', title: 'Collect Feedback', description: 'Ask for customer satisfaction rating', type: 'process', nextSteps: ['end'] },
      { id: 'end', title: 'Close Ticket', description: 'Mark support ticket as resolved', type: 'end' }
    ];
  } else {
    // Default generic process
    return [
      { id: 'start', title: 'Start Process', description: 'Begin the workflow', type: 'start', nextSteps: ['input'] },
      { id: 'input', title: 'Gather Input', description: 'Collect necessary information', type: 'process', nextSteps: ['process'] },
      { id: 'process', title: 'Process Information', description: 'Analyze and process the input data', type: 'process', nextSteps: ['decision'] },
      { id: 'decision', title: 'Make Decision', description: 'Evaluate results and decide next steps', type: 'decision', nextSteps: ['action_a', 'action_b'] },
      { id: 'action_a', title: 'Take Action A', description: 'Perform the first possible action', type: 'process', nextSteps: ['review'] },
      { id: 'action_b', title: 'Take Action B', description: 'Perform the alternative action', type: 'process', nextSteps: ['review'] },
      { id: 'review', title: 'Review Results', description: 'Evaluate the outcome of actions', type: 'process', nextSteps: ['complete'] },
      { id: 'complete', title: 'Complete Process', description: 'Finalize and conclude the workflow', type: 'end' }
    ];
  }
};

// Convert process steps to flowchart data
const convertStepsToFlowchart = (steps: ProcessStep[]): FlowchartData => {
  const nodes: FlowchartData['nodes'] = [];
  const edges: FlowchartData['edges'] = [];
  
  // Calculate positions for nodes
  const nodePositions = calculateNodePositions(steps);
  
  // Create nodes
  steps.forEach(step => {
    const position = nodePositions[step.id];
    
    nodes.push({
      id: step.id,
      type: step.type === 'decision' ? 'default' : 'default',
      position,
      data: { label: step.title },
      style: getNodeStyle(step.type)
    });
    
    // Create edges
    if (step.nextSteps) {
      step.nextSteps.forEach((nextStep, index) => {
        edges.push({
          id: `${step.id}-${nextStep}-${index}`,
          source: step.id,
          target: nextStep,
          animated: false
        });
      });
    }
  });
  
  return { nodes, edges };
};

// Calculate positions for nodes in the flowchart
const calculateNodePositions = (steps: ProcessStep[]): Record<string, { x: number, y: number }> => {
  const positions: Record<string, { x: number, y: number }> = {};
  const nodeWidth = 180;
  const nodeHeight = 80;
  const horizontalSpacing = 250;
  const verticalSpacing = 120;
  
  // Create a map of nodes to their levels
  const nodeLevels: Record<string, number> = {};
  const nodeColumns: Record<string, number> = {};
  
  // Assign levels starting from the start node
  const startNodes = steps.filter(step => step.type === 'start');
  if (startNodes.length > 0) {
    assignLevelsAndColumns(startNodes[0].id, steps, 0, 0, nodeLevels, nodeColumns);
  }
  
  // Calculate max nodes per level for centering
  const nodesPerLevel: Record<number, number> = {};
  Object.values(nodeLevels).forEach(level => {
    nodesPerLevel[level] = (nodesPerLevel[level] || 0) + 1;
  });
  
  // Calculate column offsets for centering
  const columnOffsets: Record<number, number> = {};
  Object.entries(nodesPerLevel).forEach(([level, count]) => {
    columnOffsets[Number(level)] = Math.floor((count - 1) / 2) * -1;
  });
  
  // Assign positions based on levels and columns
  Object.entries(nodeLevels).forEach(([nodeId, level]) => {
    const column = nodeColumns[nodeId] + (columnOffsets[level] || 0);
    positions[nodeId] = {
      x: column * horizontalSpacing,
      y: level * verticalSpacing
    };
  });
  
  return positions;
};

// Recursively assign levels and columns to nodes
const assignLevelsAndColumns = (
  nodeId: string,
  steps: ProcessStep[],
  level: number,
  column: number,
  nodeLevels: Record<string, number>,
  nodeColumns: Record<string, number>,
  visited: Set<string> = new Set()
): void => {
  if (visited.has(nodeId)) return;
  visited.add(nodeId);
  
  nodeLevels[nodeId] = level;
  nodeColumns[nodeId] = column;
  
  const node = steps.find(step => step.id === nodeId);
  if (!node || !node.nextSteps) return;
  
  if (node.nextSteps.length === 1) {
    // Single child - same column
    assignLevelsAndColumns(
      node.nextSteps[0],
      steps,
      level + 1,
      column,
      nodeLevels,
      nodeColumns,
      visited
    );
  } else if (node.nextSteps.length > 1) {
    // Multiple children - spread across columns
    const spread = node.nextSteps.length - 1;
    node.nextSteps.forEach((childId, index) => {
      const childColumn = column - spread / 2 + index;
      assignLevelsAndColumns(
        childId,
        steps,
        level + 1,
        childColumn,
        nodeLevels,
        nodeColumns,
        visited
      );
    });
  }
};

// Get style for a node based on its type
const getNodeStyle = (type: string): React.CSSProperties => {
  switch (type) {
    case 'start':
      return {
        background: '#e0f2fe',
        border: '1px solid #7dd3fc',
        borderRadius: '8px',
        padding: '10px',
        color: '#0c4a6e',
        fontWeight: 'bold'
      };
    case 'process':
      return {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px'
      };
    case 'decision':
      return {
        background: '#fef3c7',
        border: '1px solid #fcd34d',
        borderRadius: '8px',
        padding: '10px',
        color: '#92400e'
      };
    case 'end':
      return {
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        padding: '10px',
        color: '#991b1b',
        fontWeight: 'bold'
      };
    default:
      return {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px'
      };
  }
};

// Export flowchart as image or JSON
export const exportFlowchart = (flowchartData: FlowchartData, format: 'png' | 'svg' | 'json'): void => {
  if (format === 'json') {
    // Export as JSON
    const jsonString = JSON.stringify(flowchartData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flowchart.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // For PNG and SVG, in a real app you would use html-to-image or a similar library
    // For this demo, we'll just show a message
    console.log(`Exporting as ${format} would be implemented with html-to-image in a real app`);
    alert(`In a production app, this would download the flowchart as a ${format.toUpperCase()} file.`);
  }
};