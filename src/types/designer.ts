
export interface Page {
  id: string;
  name: string;
  components: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
  }>;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: JSX.Element;
}
