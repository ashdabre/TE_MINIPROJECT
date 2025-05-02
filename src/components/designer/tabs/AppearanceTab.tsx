
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ComponentStyle } from "../types";

interface AppearanceTabProps {
  tempStyles: ComponentStyle;
  onStyleChange: (property: keyof ComponentStyle, value: string) => void;
}

export function AppearanceTab({ tempStyles, onStyleChange }: AppearanceTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Background Color</Label>
        <Input
          type="color"
          value={tempStyles?.backgroundColor || '#ffffff'}
          onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div>
        <Label>Text Color</Label>
        <Input
          type="color"
          value={tempStyles?.textColor || '#000000'}
          onChange={(e) => onStyleChange('textColor', e.target.value)}
        />
      </div>
      <div>
        <Label>Opacity</Label>
        <Slider
          defaultValue={[parseFloat(tempStyles?.opacity || '1')]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(value) => onStyleChange('opacity', value[0].toString())}
        />
      </div>
      <div>
        <Label>Border Radius</Label>
        <Input
          type="text"
          value={tempStyles?.borderRadius || ''}
          onChange={(e) => onStyleChange('borderRadius', e.target.value)}
        />
      </div>
    </div>
  );
}
