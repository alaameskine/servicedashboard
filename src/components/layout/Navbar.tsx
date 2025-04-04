
import { FadeIn } from "../animations/FadeIn";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BellIcon, MenuIcon, SearchIcon, UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Recherche lancée",
        description: `Recherche de "${searchQuery}" en cours...`,
      });
      setSearchQuery("");
    }
  };

  return (
    <FadeIn className={cn("fixed top-0 inset-x-0 z-50", className)}>
      <header 
        className={cn(
          "w-full px-4 transition-all duration-300 ease-in-out",
          scrolled ? "py-3 glass" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Title centered in the navbar */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-semibold">Portail Chef de Service</h1>
          </div>
          
          {/* Right side - Utility buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button with Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <SearchIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <h4 className="font-medium text-sm mb-2">Recherche rapide</h4>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input 
                    placeholder="Rechercher..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <SearchIcon className="h-4 w-4 mr-1" />
                    Rechercher
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
            
            {/* Notifications Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <BellIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Notifications</h4>
                  <div className="text-sm text-muted-foreground py-8 text-center">
                    <p>Vous êtes à jour</p>
                    <p className="text-xs mt-1">0 notifications</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* User Profile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-medium">Profil utilisateur</h4>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Alaa MESKINE</div>
                    <div className="text-xs text-muted-foreground">Chef de Service</div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </FadeIn>
  );
}
