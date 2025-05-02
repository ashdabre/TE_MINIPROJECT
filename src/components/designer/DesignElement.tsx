import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DesignElementProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  isSelected: boolean;
  isPreviewMode: boolean;
  styles: Record<string, any>;
  tempStyles: Record<string, any>;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, newX: number, newY: number) => void;
  className?: string;
}



export const DesignElement = ({
  id,
  type,
  position,
  isSelected,
  isPreviewMode,
  styles,
  tempStyles,
  onClick,
  onDelete,
  onPositionChange,
  className
}: DesignElementProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onPositionChange(id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderComponent = () => {
    const componentStyles = {
      ...(isPreviewMode ? tempStyles : styles || {}),
      animation: (isPreviewMode ? tempStyles?.animation : styles?.animation) || 'none',
      transform: (isPreviewMode ? tempStyles?.transform : styles?.transform) || 'none',
    };

    switch (type) {
      case 'modal':
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Modal Title</h3>
              <p>Modal content goes here</p>
            </DialogContent>
          </Dialog>
        );
        case 'tooltip':
          const [hoverText, setHoverText] = useState("Hover me");
          const [customHoverText, setCustomHoverText] = useState("Hovered! 🎉");
        
          const handleClick = () => {
            const userInput = prompt("Enter new hover text:", customHoverText);
            if (userInput !== null && userInput.trim() !== "") {
              setCustomHoverText(userInput);
            }
          };
        
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onMouseEnter={() => setHoverText(customHoverText)} // Show user-entered text
                    onMouseLeave={() => setHoverText("Hover me")}
                    onClick={handleClick} // Prompt for new text when clicked
                  >
                    {hoverText}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{customHoverText}</p> 
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        
        
      case 'drawer':
        return (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Drawer Title</h3>
                <p>Drawer content goes here</p>
              </div>
            </DrawerContent>
          </Drawer>
        );
      case 'dropdown':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      case 'accordion':
        return (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Section 1</AccordionTrigger>
              <AccordionContent>
                Content for section 1
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Section 2</AccordionTrigger>
              <AccordionContent>
                Content for section 2
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      case 'scroll-area':
        return (
          <ScrollArea className="h-32 w-48 rounded-md border p-4">
            <div>
              <h4 className="mb-4 text-sm font-medium leading-none">Scrollable content</h4>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="text-sm">Item {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        );
      case 'tabs':
        return (
          <Tabs defaultValue="tab1" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Tab 1 content</TabsContent>
            <TabsContent value="tab2">Tab 2 content</TabsContent>
            <TabsContent value="tab3">Tab 3 content</TabsContent>
          </Tabs>
        );
      default:
        return <div>{type}</div>;
    }
  };

  return (
    <div
      id={id}
      className={`design-element group relative ${className || ""} ${isSelected ? "ring-2 ring-primary" : ""} ${
        isPreviewMode ? tempStyles?.animation : styles?.animation || ""
      }`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'move',
        ...(isPreviewMode ? tempStyles : styles || {}),
      }}
      onClick={() => onClick(id)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {renderComponent()}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3 text-destructive-foreground" />
      </button>
    </div>
  );
};
