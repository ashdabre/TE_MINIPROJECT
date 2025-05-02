
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentStyle } from "../types";

interface TypographyTabProps {
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
}

export function TypographyTab({ tempStyles, onStyleChange }: TypographyTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Font Family</Label>
        <Input
          type="text"
          value={tempStyles?.fontFamily || ''}
          onChange={(e) => onStyleChange('fontFamily', e.target.value)}
        />
      </div>
      <div>
        <Label>Font Size</Label>
        <Input
          type="text"
          value={tempStyles?.fontSize || ''}
          onChange={(e) => onStyleChange('fontSize', e.target.value)}
        />
      </div>
      <div>
        <Label>Font Weight</Label>
        <Input
          type="text"
          value={tempStyles?.fontWeight || ''}
          onChange={(e) => onStyleChange('fontWeight', e.target.value)}
        />
      </div>
      <div>
        <Label>Text Align</Label>
        <Input
          type="text"
          value={tempStyles?.textAlign || ''}
          onChange={(e) => onStyleChange('textAlign', e.target.value)}
        />
      </div>
    </div>
  );
}
