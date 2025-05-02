import { Component } from "../types/designer";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const templates = [
  {
    id: "template1",
    name: "Modern Dashboard",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    description: "Clean and modern dashboard template with data visualization"
  },
  {
    id: "template2",
    name: "Portfolio",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Showcase your work with this sleek portfolio template"
  },
  {
    id: "template3",
    name: "Blog",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Share your thoughts with this modern blog template"
  }
];

export const componentLibrary: Component[] = [
  {
    id: "modal",
    name: "Modal",
    description: "A dialog box/popup window",
    category: "Overlay",
    preview: (
      <Dialog>
        <Button variant="outline">Open Modal</Button>
      </Dialog>
    )
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Informative popup on hover",
    category: "Overlay",
    preview: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    id: "drawer",
    name: "Drawer",
    description: "Sliding side panel",
    category: "Navigation",
    preview: (
      <Drawer>
        <Button variant="outline">Open Drawer</Button>
      </Drawer>
    )
  },
  {
    id: "dropdown",
    name: "Dropdown Menu",
    description: "Menu with options",
    category: "Navigation",
    preview: (
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
    )
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Tabbed interface",
    category: "Navigation",
    preview: (
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    )
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Collapsible content sections",
    category: "Layout",
    preview: (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    description: "Custom scrollable content",
    category: "Layout",
    preview: (
      <ScrollArea className="h-32 w-48 rounded-md border p-4">
        <div className="space-y-4">
          <p>Long scrollable content...</p>
          <p>More content...</p>
          <p>Even more content...</p>
        </div>
      </ScrollArea>
    )
  },
  {
    id: "button",
    name: "Button",
    description: "Interactive button component",
    category: "Form",
    preview: <Button>Click me</Button>
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "Form checkbox component",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    )
  },
  {
    id: "input",
    name: "Input",
    description: "Text input field",
    category: "Form",
    preview: <Input placeholder="Type here..." />
  },
  {
    id: "select",
    name: "Select",
    description: "Dropdown select component",
    category: "Form",
    preview: (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
  },
  {
    id: "radio",
    name: "Radio Group",
    description: "Radio button group",
    category: "Form",
    preview: (
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-1" id="option-1" />
          <Label htmlFor="option-1">Option 1</Label>
        </div>
      </RadioGroup>
    )
  },
  {
    id: "switch",
    name: "Switch",
    description: "Toggle switch component",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    )
  },
  {
    id: "card",
    name: "Card",
    description: "Content container card",
    category: "Layout",
    preview: (
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Content goes here</CardContent>
      </Card>
    )
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "User avatar component",
    category: "Display",
    preview: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  },
  {
    id: "badge",
    name: "Badge",
    description: "Status badge component",
    category: "Display",
    preview: <Badge>New</Badge>
  },
  {
    id: "progress",
    name: "Progress",
    description: "Progress indicator",
    category: "Display",
    preview: <Progress value={66} />
  },
  {
    id: "separator",
    name: "Separator",
    description: "Visual divider",
    category: "Layout",
    preview: <Separator className="my-2" />
  }
];

export { templates };
