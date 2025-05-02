export interface FlowchartNode {
                                                id: string;
                                                type: string;
                                                position: { x: number; y: number };
                                                data: { label: string };
                                                style?: React.CSSProperties;
                                              }
                                              
                                              export interface FlowchartEdge {
                                                id: string;
                                                source: string;
                                                target: string;
                                                type?: string;
                                                animated?: boolean;
                                                label?: string;
                                                style?: React.CSSProperties;
                                              }
                                              
                                              export interface FlowchartData {
                                                nodes: FlowchartNode[];
                                                edges: FlowchartEdge[];
                                              }
                                              
                                              export interface FlowchartVariation {
                                                id: string;
                                                name: string;
                                                data: FlowchartData;
                                                theme: string;
                                              }
                                              
                                              export interface ProcessStep {
                                                id: string;
                                                title: string;
                                                description: string;
                                                type: 'start' | 'process' | 'decision' | 'end';
                                                nextSteps?: string[];
                                              }
                                              
                                              export interface FlowchartTheme {
                                                id: string;
                                                name: string;
                                                nodeStyles: {
                                                  default: React.CSSProperties;
                                                  start: React.CSSProperties;
                                                  process: React.CSSProperties;
                                                  decision: React.CSSProperties;
                                                  end: React.CSSProperties;
                                                };
                                                edgeStyles: React.CSSProperties;
                                                backgroundColor: string;
                                              }
                                              
                                              export type ExportFormat = 'png' | 'svg' | 'json';