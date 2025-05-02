import { Code, X } from "lucide-react";
import { Page } from "../../types/designer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CustomizePanel } from "./CustomizePanel";
import { useToast } from "@/components/ui/use-toast";
import { EmptyCanvas } from "./EmptyCanvas";
import { DesignElement } from "./DesignElement";
import { CodePreview } from "./CodePreview";
import interact from "interactjs";

interface CanvasProps {
  page: Page;
  onDrop: (e: React.DragEvent) => void;
  deleteComponent: (componentId: string) => void;
}
const handlePositionChange = (id: string, newX: number, newY: number) => {
  setComponentStyles((prev) => ({
    ...prev,
    [id]: {
      ...prev[id],
      position: { x: newX, y: newY }, // Update the position
    },
  }));
};

const Canvas = ({ page, onDrop, deleteComponent }: CanvasProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [componentStyles, setComponentStyles] = useState<Record<string, any>>({});
  const [tempStyles, setTempStyles] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    interact(".draggable")
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({ restriction: "parent" })
        ],
        listeners: {
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          }
        }
      });
  }, []);
  

  const handleComponentClick = (componentId: string) => {
    setSelectedComponent(componentId);
    setTempStyles(componentStyles[componentId] || {});
  };

  const handleStyleChange = (property: string, value: string) => {
    setTempStyles((prev: any) => ({ ...prev, [property]: value }));
  };

  const handlePreviewToggle = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleRevertStyles = () => {
    if (selectedComponent) {
      setTempStyles(componentStyles[selectedComponent] || {});
      toast({
        title: "Changes reverted",
        duration: 1500
      });
    }
  };

  const handleApplyStyles = () => {
    if (selectedComponent && tempStyles) {
      setComponentStyles(prev => ({
        ...prev,
        [selectedComponent]: tempStyles
      }));
      toast({
        title: "Styles applied successfully",
        duration: 1500
      });
    }
  };

  const closeCustomizePanel = () => {
    setSelectedComponent(null);
    setTempStyles(null);
  };

  return (
    <div className="flex h-full">
      <div
        className="flex-1 bg-background text-foreground rounded-xl relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {page.components.length === 0 ? (
          <EmptyCanvas />
        ) : (
          <div className="relative w-full h-full ">
  {page.components.map((component) => (
    <DesignElement
      key={component.id}
      id={component.id}
      type={component.type}
      position={component.position}
      isSelected={selectedComponent === component.id}
      isPreviewMode={isPreviewMode}
      styles={componentStyles[component.id]}
      tempStyles={selectedComponent === component.id ? tempStyles : null}
      onClick={handleComponentClick}
      onDelete={deleteComponent}
      className="draggable bg-transparent border-none" 
      onPositionChange={handlePositionChange}
    /> ))}
          </div>
        )}
      </div>

      {selectedComponent && (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={closeCustomizePanel}
          >
            <X className="h-4 w-4" />
          </Button>
          <CustomizePanel
            selectedComponent={selectedComponent}
            isPreviewMode={isPreviewMode}
            tempStyles={tempStyles}
            onStyleChange={handleStyleChange}
            onPreviewToggle={handlePreviewToggle}
            onRevertStyles={handleRevertStyles}
            onApplyStyles={handleApplyStyles}
            onClose={() => setSelectedComponent(null)}
          />
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <Button
          variant="secondary"
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          {showCode ? 'Hide Code' : 'Show Code'}
        </Button>
      </div>

      <CodePreview
        isOpen={showCode}
        onClose={() => setShowCode(false)}
        styles={componentStyles}
        components={page.components}
      />
    </div>
  );
};

export default Canvas;

function setComponentStyles(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
