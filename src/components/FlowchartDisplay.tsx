import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  ConnectionLineType,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowchartData, FlowchartTheme } from '../types/index1';
import { Copy, Download, FileJson, Edit, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import NodeEditModal from './NodeEditModal';

interface FlowchartDisplayProps {
  flowchartData: FlowchartData;
  theme: FlowchartTheme;
  onExport: (format: 'png' | 'svg' | 'json') => void;
  onSave?: (data: FlowchartData) => void;
}

const FlowchartDisplay: React.FC<FlowchartDisplayProps> = ({
  flowchartData,
  theme,
  onExport,
  onSave
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(flowchartData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowchartData.edges);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Handle connections between nodes
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => 
      addEdge({
        ...params,
        type: 'smoothstep',
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }, eds)
    );
  }, [setEdges]);

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (isEditing) {
      setSelectedNode(node);
      setIsNodeModalOpen(true);
    }
  }, [isEditing]);

  // Update node data
  const handleUpdateNode = useCallback((id: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label,
            },
          };
        }
        return node;
      })
    );
    setIsNodeModalOpen(false);
  }, [setNodes]);

  // Add a new node
  const handleAddNode = useCallback(() => {
    const newNodeId = `node_${nodes.length + 1}`;
    const position = {
      x: Math.random() * 300,
      y: Math.random() * 300,
    };
    
    const newNode = {
      id: newNodeId,
      type: 'default',
      position,
      data: { label: 'New Node' },
      style: {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px'
      }
    };
    
    setNodes((nds) => [...nds, newNode]);
    toast.success('New node added. Connect it to other nodes by dragging from the handles.');
  }, [nodes, setNodes]);

  // Delete selected elements (nodes and edges)
  const handleDeleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
    toast.success('Selected elements deleted');
  }, [setNodes, setEdges]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
    toast.info(isEditing ? 'Edit mode disabled' : 'Edit mode enabled. Click on nodes to edit them.');
  }, [isEditing]);

  // Save the current flowchart
  const handleSave = useCallback(() => {
    const updatedFlowchart = {
      nodes,
      edges
    };
    
    if (onSave) {
      onSave(updatedFlowchart);
    }
    
    toast.success('Flowchart saved successfully');
  }, [nodes, edges, onSave]);

  // Copy flowchart to clipboard
  const handleCopy = useCallback(() => {
    const jsonData = JSON.stringify({ nodes, edges }, null, 2);
    navigator.clipboard.writeText(jsonData);
    toast.success('Flowchart copied to clipboard as JSON');
  }, [nodes, edges]);

  return (
    <>
      <div className="flowchart-container rounded-lg overflow-hidden border border-gray-200 shadow-md" 
        style={{ backgroundColor: theme.backgroundColor }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          attributionPosition="bottom-right"
          deleteKeyCode="Delete"
          selectionKeyCode="Shift"
          multiSelectionKeyCode="Control"
          snapToGrid={true}
          snapGrid={[15, 15]}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap />
          <Panel position="top-right">
            <div className="flex space-x-2">
              <button
                onClick={toggleEditMode}
                className={`btn-secondary flex items-center space-x-1 ${isEditing ? 'bg-indigo-100 text-indigo-700' : ''}`}
                title={isEditing ? "Disable edit mode" : "Enable edit mode"}
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? "Editing" : "Edit"}</span>
              </button>
              
              {isEditing && (
                <>
                  <button
                    onClick={handleAddNode}
                    className="btn-secondary flex items-center space-x-1"
                    title="Add new node"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Node</span>
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="btn-secondary flex items-center space-x-1"
                    title="Delete selected elements"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-secondary flex items-center space-x-1"
                    title="Save changes"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </>
              )}
              
              <button
                onClick={() => onExport('png')}
                className="btn-secondary flex items-center space-x-1"
                title="Download as PNG"
              >
                <Download className="h-4 w-4" />
                <span>PNG</span>
              </button>
              <button
                onClick={() => onExport('svg')}
                className="btn-secondary flex items-center space-x-1"
                title="Download as SVG"
              >
                <Download className="h-4 w-4" />
                <span>SVG</span>
              </button>
              <button
                onClick={() => onExport('json')}
                className="btn-secondary flex items-center space-x-1"
                title="Download as JSON"
              >
                <FileJson className="h-4 w-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={handleCopy}
                className="btn-secondary flex items-center space-x-1"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      
      {isNodeModalOpen && selectedNode && (
        <NodeEditModal
          node={selectedNode}
          onClose={() => setIsNodeModalOpen(false)}
          onUpdate={handleUpdateNode}
        />
      )}
    </>
  );
};

export default FlowchartDisplay;