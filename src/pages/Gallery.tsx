import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface PinterestPin {
  id: string;
  title: string;
  image_url: string;
  description: string;
}

const Gallery = ({ onLoadDesign }: { onLoadDesign: (design: any) => void }) => {
  const { toast } = useToast();
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);

  // Load saved designs from localStorage
  useEffect(() => {
    const updateGallery = () => {
      const storedDesigns = JSON.parse(localStorage.getItem("designGallery") || "[]");
      setSavedDesigns(storedDesigns);
    };
  
    updateGallery(); // Load on mount
  
    window.addEventListener("storage", updateGallery); // Listen for storage changes
    return () => window.removeEventListener("storage", updateGallery); // Cleanup
  }, []);
  

  // Fetch API-based template designs (e.g., Pinterest)
  const { data: pins, isLoading, error } = useQuery({
    queryKey: ['pinterestPins'],
    queryFn: async () => {
      return [
        {
          id: '1',
          title: 'Modern Dashboard',
          image_url: 'https://cdn.dribbble.com/userupload/17362417/file/original-5ab2d714d0771c9e0db7b7cd21a0e19e.png?resize=752x&vertical=center',
          description: 'Clean and modern dashboard design'
        },
        {
          id: '2',
          title: 'Portfolio Template',
          image_url: 'https://cdn.dribbble.com/userupload/6837855/file/original-84e6ad84f61898d244fbbb27952865d1.png?resize=752x&vertical=center',
          description: 'Professional portfolio layout'
        },
        {
          id: '3',
          title: 'Landing Page',
          image_url: 'https://cdn.dribbble.com/userupload/17873768/file/original-2c47a952e4edc0babf88f12734bdf3b8.jpg?resize=752x&vertical=center',
          description: 'Converting landing page design'
        },
        {
          id: '4',
          title: 'Admin Panel',
          image_url: 'https://cdn.dribbble.com/userupload/5066991/file/original-31348267c20dc736c607e030fb3fbb0a.png?resize=752x&vertical=center',
          description: 'Feature-rich admin interface'
        },
        {
          id: '5',
          title: 'E-commerce Design',
          image_url: 'https://cdn.dribbble.com/userupload/8627406/file/original-00075081fc348a864a534261c8078ab0.png?resize=752x&vertical=center',
          description: 'Modern e-commerce template'
        },
        {
          id: '6',
          title: 'OTT Platform',
          image_url: 'https://cdn.dribbble.com/userupload/17980005/file/original-f431d0a265fb130c49c7b4a352be62e5.png?resize=752x&vertical=center',
          description: 'OTT Platform'
        }
        
      ] as PinterestPin[];
    }
  });

  // Handle loading a saved design into the editor
  const handleLoadDesign = (design: any) => {
    onLoadDesign(design);
    toast({
      title: "Loaded Design",
      description: `Editing ${design.title}...`,
      duration: 2000
    });
  };

  // Handle deleting a saved design
  const handleDeleteDesign = (id: string) => {
    const updatedGallery = savedDesigns.filter((design) => design.id !== id);
    setSavedDesigns(updatedGallery);
    localStorage.setItem("designGallery", JSON.stringify(updatedGallery));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground">
      <Navigation />
      <div className="container mx-auto px-6 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">Design Gallery</h1>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Error loading gallery. Please try again.</p>
          </div>
        )}

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            
            {/* Display Saved Designs */}
            {savedDesigns.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-white col-span-full">Your Saved Designs</h2>
                {savedDesigns.map((design) => (
                  <div key={design.id} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="p-4">
                      <h3 className="text-lg text-white font-semibold mb-1">{design.title || "Untitled Design"}</h3>
                      <p className="text-sm text-gray-400 mb-4">{design.timestamp}</p>
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => handleLoadDesign(design)}>
                          Load Design
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteDesign(design.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Display API Templates */}
            <h2 className="text-xl font-semibold text-white col-span-full">Template Designs</h2>
            {pins?.map((pin) => (
              <div key={pin.id} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <img src={pin.image_url} alt={pin.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg text-white font-semibold mb-1">{pin.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{pin.description}</p>
                  <Button onClick={() => handleLoadDesign(pin)} variant="secondary" className="w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Gallery;
