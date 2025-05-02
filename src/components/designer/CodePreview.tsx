
import { Button } from "@/components/ui/button";

interface CodePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  styles: Record<string, any>;
  components?: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
  }>;
}

export const CodePreview = ({ isOpen, onClose, styles, components }: CodePreviewProps) => {
  if (!isOpen) return null;

  const generateComponentCode = (component: any) => {
    const componentStyles = styles[component.id] || {};
    const allStyles = {
      position: 'absolute',
      left: `${component.position.x}px`,
      top: `${component.position.y}px`,
      ...componentStyles
    };

    let componentJSX = '';
    switch (component.type) {
      case 'modal':
        componentJSX = `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <h3>Modal Title</h3>
    <p>Modal content goes here</p>
  </DialogContent>
</Dialog>`;
        break;
      case 'tabs':
        componentJSX = `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>`;
        break;
      default:
        componentJSX = `<${component.type} />`;
    }

    return `
// ${component.type} Component
<div style={${JSON.stringify(allStyles, null, 2)}}>
  ${componentJSX}
</div>`;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 p-6">
      <div className="bg-card rounded-lg p-6 w-full h-full overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Generated Code</h3>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
          {components?.length ? (
            components.map(comp => generateComponentCode(comp)).join('\n\n')
          ) : (
            'No components added to canvas yet'
          )}
        </pre>
      </div>
    </div>
  );
};
