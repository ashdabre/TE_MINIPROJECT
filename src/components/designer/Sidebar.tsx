
import { Plus, Eye, Trash2 } from "lucide-react";
import { Page, Component } from "../../types/designer";

interface SidebarProps {
  pages: Page[];
  activePage: string;
  addNewPage: () => void;
  deletePage: (pageId: string) => void;
  setActivePage: (pageId: string) => void;
  handleComponentDragStart: (e: React.DragEvent, componentId: string) => void;
  components: Component[];
  previewComponent: string | null;
  setPreviewComponent: (id: string | null) => void;
}

const Sidebar = ({
  pages,
  activePage,
  addNewPage,
  deletePage,
  setActivePage,
  handleComponentDragStart,
  components,
  previewComponent,
  setPreviewComponent
}: SidebarProps) => {
  return (
    <div className="w-64 bg-card border-r border-border p-4 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Designer</h1>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">Pages</h2>
          <button 
            onClick={addNewPage}
            className="text-white bg-white/10 p-1 rounded hover:bg-white/20 transition-all"
          >
            <Plus className="w-4 h-4 text-black" />
          </button>
        </div>
        <div className="space-y-2">
          {pages.map(page => (
            <div 
              key={page.id}
              className={`flex items-center justify-between p-2 rounded ${
                activePage === page.id ? 'bg-primary/20' : 'bg-white/5'
              } hover:bg-white/10 transition-all cursor-pointer`}
              onClick={() => setActivePage(page.id)}
            >
              <span>{page.name}</span>
              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(page.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">Components</h2>
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-2">
          {components.map((component) => (
            <div 
              key={component.id}
              className="bg-white/5 rounded p-3 cursor-move hover:bg-white/10 transition-all"
              draggable
              onDragStart={(e) => handleComponentDragStart(e, component.id)}
              onMouseEnter={() => setPreviewComponent(component.id)}
              onMouseLeave={() => setPreviewComponent(null)}
            >
              <div className="flex items-center justify-between">
                <span>{component.name}</span>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
              {previewComponent === component.id && (
                <div className="mt-2">{component.preview}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
