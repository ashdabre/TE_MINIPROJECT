
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentStyle } from "../types";

interface EffectsTabProps {
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
}

export function EffectsTab({ tempStyles, onStyleChange }: EffectsTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Shadow</Label>
        <Input
          type="text"
          value={tempStyles?.boxShadow || ''}
          onChange={(e) => onStyleChange('boxShadow', e.target.value)}
        />
      </div>
      <div>
        <Label>Transform</Label>
        <Input
          type="text"
          value={tempStyles?.transform || ''}
          onChange={(e) => onStyleChange('transform', e.target.value)}
        />
      </div>
      <div>
        <Label>Animation</Label>
        <Input
          type="text"
          value={tempStyles?.animation || ''}
          onChange={(e) => onStyleChange('animation', e.target.value)}
        />
      </div>
    </div>
  );
}
