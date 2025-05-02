
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentStyle } from "../types";

interface AdvancedTabProps {
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
}

export function AdvancedTab({ tempStyles, onStyleChange }: AdvancedTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Z-Index</Label>
        <Input
          type="text"
          value={tempStyles?.zIndex || ''}
          onChange={(e) => onStyleChange('zIndex', e.target.value)}
        />
      </div>
      <div>
        <Label>Overflow</Label>
        <Input
          type="text"
          value={tempStyles?.overflow || ''}
          onChange={(e) => onStyleChange('overflow', e.target.value)}
        />
      </div>
      <div>
        <Label>Custom CSS</Label>
        <Input
          type="text"
          value={tempStyles?.customCSS || ''}
          onChange={(e) => onStyleChange('customCSS', e.target.value)}
        />
      </div>
    </div>
  );
}
