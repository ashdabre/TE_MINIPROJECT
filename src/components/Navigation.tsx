
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import contact from "../pages/contact";
const Navigation = () => {
  const { toast } = useToast();

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
          DragNative
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Templates</Link>
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Learn</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/designer"
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
