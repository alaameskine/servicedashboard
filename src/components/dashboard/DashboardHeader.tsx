
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FadeIn } from "../animations/FadeIn";
import { BellIcon } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const { toast } = useToast();
  
  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Bonjour, Alaa</h2>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de votre équipe et des demandes en attente
          </p>
        </div>
        <div className="flex gap-3 items-center">
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
          
          <Link to="/requests">
            <Button>Approuver les demandes</Button>
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
