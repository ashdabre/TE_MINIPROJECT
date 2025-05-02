
import { Plus } from "lucide-react";

export const EmptyCanvas = () => {
  return (
    <div className="text-center text-muted-foreground absolute inset-0 flex items-center justify-center">
      <div>
        <Plus className="w-8 h-8 mx-auto mb-4" />
        <p className="text-lg mb-2">Drop components here</p>
        <p className="text-sm">Drag components from the left panel to start building</p>
      </div>
    </div>
  );
};
