import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "../components/designer/Sidebar";
import Canvas from "../components/designer/Canvas";
import TopBar from "../components/designer/TopBar";
import { componentLibrary } from "../data/componentLibrary";
import { Page } from "../types/designer";

const Designer = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([
    { id: "1", name: "Page 1", components: [] }
  ]);
  const [activePage, setActivePage] = useState<string>("1");
  const [previewComponent, setPreviewComponent] = useState<string | null>(null);
  const [draggingComponent, setDraggingComponent] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [designName, setDesignName] = useState("");

  const addNewPage = () => {
    const newPageId = (pages.length + 1).toString();
    setPages([...pages, { id: newPageId, name: `Page ${newPageId}`, components: [] }]);
    toast.success("New page added!");
  };

  const deletePage = (pageId: string) => {
    if (pages.length === 1) {
      toast.error("Cannot delete the last page");
      return;
    }
    const newPages = pages.filter(page => page.id !== pageId);
    setPages(newPages);
    if (activePage === pageId) {
      setActivePage(newPages[0].id);
    }
    toast.success("Page deleted!");
  };

  const handleComponentDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData("componentId");
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      toast.error("Components must be dropped within the canvas!");
      return;
    }

    setPages(pages.map(page => {
      if (page.id === activePage) {
        return {
          ...page,
          components: [...page.components, {
            id: `${componentId}-${Date.now()}`,
            type: componentId,
            position: { x, y }
          }]
        };
      }
      return page;
    }));
    setDraggingComponent(false);
  };

  const handleComponentDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData("componentId", componentId);
    setDraggingComponent(true);
  };

  const deleteComponent = (componentId: string) => {
    setPages(pages.map(page => {
      if (page.id === activePage) {
        return {
          ...page,
          components: page.components.filter(comp => comp.id !== componentId)
        };
      }
      return page;
    }));
    toast.success("Component deleted!");
  };

  const handleSave = () => {
    if (!designName.trim()) {
      toast.error("Please enter a design name");
      return;
    }

    const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]");
    const newDesign = {
      id: Date.now().toString(),
      name: designName,
      pages,
      dateCreated: new Date().toISOString(),
    };
    savedDesigns.push(newDesign);
    localStorage.setItem("savedDesigns", JSON.stringify(savedDesigns));
    
    toast.success("Design saved successfully!");
    setShowSaveDialog(false);
    setDesignName("");
  };

  const handleBack = () => {
    if (pages.some(page => page.components.length > 0)) {
      setShowBackDialog(true);
    } else {
      navigate("/");
    }
  };

  const activePage_data = pages.find(page => page.id === activePage);
  if (!activePage_data) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar
        pages={pages}
        activePage={activePage}
        addNewPage={addNewPage}
        deletePage={deletePage}
        setActivePage={setActivePage}
        handleComponentDragStart={handleComponentDragStart}
        components={componentLibrary}
        previewComponent={previewComponent}
        setPreviewComponent={setPreviewComponent}
      />

      <div className="flex-1 p-8">
        <Canvas
          page={activePage_data}
          onDrop={handleComponentDrop}
          deleteComponent={deleteComponent}
        />
      </div>

      <TopBar
        onBack={handleBack}
        onSave={() => setShowSaveDialog(true)}
      />

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Design</DialogTitle>
            <DialogDescription>
              Enter a name for your design to save it to your gallery.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="designName">Design Name</Label>
            <Input
              id="designName"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="My Awesome Design"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Design</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBackDialog} onOpenChange={setShowBackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes?</DialogTitle>
            <DialogDescription>
              Would you like to save your changes before leaving?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => navigate("/")}>
              Don't Save
            </Button>
            <Button onClick={() => setShowSaveDialog(true)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Designer;
