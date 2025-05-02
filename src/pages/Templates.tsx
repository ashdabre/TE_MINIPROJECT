
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DribbbleShot {
  id: string;
  title: string;
  images: {
    normal: string;
  };
  description: string;
  tags: string[];
}

const Templates = () => {
  const { toast } = useToast();
  const { data: shots, isLoading, error } = useQuery({
    queryKey: ['dribbbleShots'],
    queryFn: async () => {
      // Mock data for now - will be replaced with actual Dribbble API call
      return [
        {
          id: '1',
          title: 'Modern Dashboard Template',
          images: {
            normal: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
          },
          description: 'Clean and modern dashboard design with dark mode',
          tags: ['dashboard', 'dark', 'modern']
        },
        {
          id: '2',
          title: 'E-commerce Layout',
          images: {
            normal: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc'
          },
          description: 'Responsive e-commerce template with cart functionality',
          tags: ['ecommerce', 'shop', 'responsive']
        },
        {
          id: '3',
          title: 'Portfolio Design',
          images: {
            normal: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8'
          },
          description: 'Creative portfolio template for designers',
          tags: ['portfolio', 'creative', 'minimal']
        }
      ] as DribbbleShot[];
    }
  });

  const handleUseTemplate = (shot: DribbbleShot) => {
    toast({
      title: "Template Selected",
      description: `Loading ${shot.title}...`,
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground">
      <Navigation />
      <div className="container mx-auto px-6 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">All Templates</h1>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading templates...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Error loading templates. Please try again.</p>
          </div>
        )}

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {shots?.map((shot) => (
              <div
                key={shot.id}
                className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <img
                  src={shot.images.normal}
                  alt={shot.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{shot.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{shot.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {shot.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-white/5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleUseTemplate(shot)}
                    variant="secondary"
                    className="w-full"
                  >
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

export default Templates;
