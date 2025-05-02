import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ArrowRight, SunMoon, Eye, Download, Code } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const features = [
  {
    title: "AI-Powered Design",
    description: "Create professional designs with AI assistance",
    icon: "✨",
    glowColor: "from-[#6666FF]"
  },
  {
    title: "Component Library",
    description: "Access 1000+ pre-built components",
    icon: "🎨",
    glowColor: "from-[#DA62C4]"
  },
  {
    title: "Export & Deploy",
    description: "Export to React, Vue, or plain HTML/CSS",
    icon: "🚀",
    glowColor: "from-[#FF6B6B]"
  },
  {
    title: "Create and Visualize",
    description: "simple text bmake it onto awesome visualization",
    icon: "🔮",
    glowColor: "from-[#FF6B6B]"
  }
];

const recentTemplates = [
  {
    id: 1,
    title: "Modern Dashboard",
    image: "https://cdn.dribbble.com/userupload/16315193/file/original-b71a789caa417ea67da5bf31be8d737b.png?resize=752x&vertical=center",
    category: "Admin",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  },
  {
    id: 2,
    title: "E-commerce Landing",
    image: "https://cdn.dribbble.com/userupload/21167209/file/original-ce2f4bbd142e00aeafd3c27aba708435.png?resize=752x&vertical=center",
    category: "Landing Page",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  },
  {
    id: 3,
    title: "Portfolio Template",
    image: "https://cdn.dribbble.com/userupload/7882411/file/original-834d39735ac66e2505441165442044f4.png?resize=752x&vertical=center",
    category: "Portfolio",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    image: "https://cdn.dribbble.com/userupload/16089877/file/original-dcd8b1527022ba216f4d85029545f833.png?resize=752x&vertical=center",
    category: "Dashboard",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  },
  {
    id: 5,
    title: "Blog Platform",
    image: "https://cdn.dribbble.com/userupload/14620509/file/original-c54dae5db1f3d079a519efaaa70ef3bc.png?resize=752x&vertical=center",
    category: "CMS",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  },
  {
    id: 6,
    title: "Social Media App",
    image: "https://cdn.dribbble.com/userupload/9614345/file/original-3c8ee280677fd045f1d9494a276ef58f.png?resize=752x&vertical=center",
    category: "Application",
    dribbbleLink: "https://dribbble.com/shots/popular/web-design"
  }
];

const Index = () => {
  const [uiPrompt, setUiPrompt] = useState("");

  const handleGenerateUI = () => {
    // Implement UI generation logic here
    console.log("Generating UI for:", uiPrompt);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-foreground">
          {/* // <div className="min-h-screen bg-gradient-to-r from-[#101028] via-[#16051b] to-[#180434] text-foreground"> */}

      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-white text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Design with{" "}
              <span className="bg-gradient-to-r from-[#6666FF] via-[#DA62C4] to-[#FF6B6B] bg-clip-text text-transparent animate-gradient hover:animate-glow">
                confidence
              </span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12">
              Create stunning web designs in minutes with our AI-powered drag-and-drop interface.
            </p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <Link
                to="/designer"
                className="px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-opacity-90 transition-all animate-scale-in"
              >
                Start Designing
              </Link>
            </div>
            <Link
              to="/gallery"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Gallery
            </Link>
            <Link
              to="/genr"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Generate UI
            </Link>
           
            <Link
              to="/Doc"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Documentation
            </Link>
           
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all">
                  Documentation
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Documentation Options</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Button variant="outline" onClick={() => {}}>
                    View Project Documentation
                  </Button>
                  <Button variant="outline" onClick={() => {}}>
                    Generate Design Documentation
                  </Button>
                </div>
              </DialogContent>
            </Dialog> */}
            <Link
              to="/flowc"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all"
            >
              Visualize
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="py-20 px-6">
  <div className="max-w-8xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all group hover:shadow-glow relative overflow-hidden`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.glowColor} to-transparent opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
          <div className="relative z-10">
            <div className="text-4xl mb-4 animate-bounce text-white">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white transition-colors">{feature.title}</h3>
            <p className="text-white group-hover:text-gray-300 transition-colors">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Recent Templates Section */}
      <section className="py-20 px-6 border-t border-white/10">
  <div className="max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-white">Recent Templates</h2>
      <Link 
        to="/templates" 
        className="text-gray-400 hover:text-white transition-colors"
      >
        View all →
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentTemplates.map((template) => (
        <Link 
          key={template.id} 
          to={template.dribbbleLink} 
          target="_blank" 
          className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{template.title}</h3>
            <Button 
              variant="ghost" 
              className="mt-2 text-white hover:text-white hover:bg-white/10"
            >
              View on Dribbble
            </Button>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">DragNative</h3>
      <p className="text-gray-400">Create stunning web designs with AI-powered tools</p>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-white">Features</h4>
      <ul className="space-y-2 text-gray-400">
        <li>AI Design Generation</li>
        <li>Component Library</li>
        <li>Custom Templates</li>
        <li>Export Options</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-white">Resources</h4>
      <ul className="space-y-2 text-gray-400">
        <li>Documentation</li>
        <li>Tutorials</li>
        <li>Blog</li>
        <li>Support</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-white">Connect</h4>
      <ul className="space-y-2 text-gray-400">
        <li>Twitter</li>
        <li>GitHub</li>
        <li>Discord</li>
        <li>Email</li>
      </ul>
    </div>
  </div>
  <div className="mt-12 text-center text-gray-400">
    <p>© 2024 DragNative All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Index;
