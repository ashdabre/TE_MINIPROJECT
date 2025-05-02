
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentStyle } from "../types";

interface LayoutTabProps {
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
}

export function LayoutTab({ tempStyles, onStyleChange }: LayoutTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Position X</Label>
        <Input
          type="text"
          value={tempStyles?.x || ''}
          onChange={(e) => onStyleChange('x', e.target.value)}
        />
      </div>
      <div>
        <Label>Position Y</Label>
        <Input
          type="text"
          value={tempStyles?.y || ''}
          onChange={(e) => onStyleChange('y', e.target.value)}
        />
      </div>
      <div>
        <Label>Width</Label>
        <Input
          type="text"
          value={tempStyles?.width || ''}
          onChange={(e) => onStyleChange('width', e.target.value)}
        />
      </div>
      <div>
        <Label>Height</Label>
        <Input
          type="text"
          value={tempStyles?.height || ''}
          onChange={(e) => onStyleChange('height', e.target.value)}
        />
      </div>
    </div>
  );
}
