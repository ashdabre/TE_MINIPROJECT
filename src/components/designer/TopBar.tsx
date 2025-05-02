import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Function to handle exporting the current design state as a file
const handleExportCode = () => {
  const data = JSON.stringify({ message: "Your design file's JSON or code here" }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "design_export.json"; // Adjust filename & extension if needed
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Function to handle deploying to Netlify
const handleDeployToNetlify = () => {
  window.open("https://app.netlify.com/start", "_blank"); // Opens Netlify deployment page
};

interface TopBarProps {
  onBack: () => void;
  onSave: () => void;
}

const TopBar = ({ onBack, onSave }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b flex items-center px-4 gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
      </Button>
      
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" onClick={onSave}>
          Save
        </Button>

        {/* Dropdown for Export & Deploy */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-1">
              Export & Deploy <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-md">
            <DropdownMenuItem onClick={handleExportCode}>Export Code</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeployToNetlify}>Deploy to Netlify</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
