
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  FileTextIcon, 
  UsersIcon, 
  UserPlusIcon, 
  ClipboardCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserMinusIcon
} from "lucide-react";
import { FadeIn } from "../animations/FadeIn";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(path.startsWith("/employes"));

  return (
    <FadeIn className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 p-4 pt-20 hidden md:block">
      <nav className="space-y-1">
        <SidebarItem 
          icon={<HomeIcon className="h-5 w-5" />} 
          href="/" 
          active={path === "/"}
        >
          Accueil
        </SidebarItem>
        
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium",
                path.startsWith("/employes") 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                <UsersIcon className="h-5 w-5" />
                <span>Fonctionnaires</span>
              </div>
              {isOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-10 space-y-1 mt-1">
            <SidebarSubItem 
              href="/employes" 
              active={path === "/employes"}
              icon={<UsersIcon className="h-4 w-4" />}
            >
              Liste des fonctionnaires
            </SidebarSubItem>
            <SidebarSubItem 
              href="/employes" 
              active={path === "/employes/ajouter"}
              icon={<UserPlusIcon className="h-4 w-4" />}
            >
              Ajouter un fonctionnaire
            </SidebarSubItem>
            <SidebarSubItem 
              href="/employes" 
              active={path === "/employes/supprimer"}
              icon={<UserMinusIcon className="h-4 w-4" />}
            >
              Supprimer un fonctionnaire
            </SidebarSubItem>
          </CollapsibleContent>
        </Collapsible>
        
        <SidebarItem 
          icon={<FileTextIcon className="h-5 w-5" />} 
          href="/requests"
          active={path === "/requests"}
        >
          Demandes
        </SidebarItem>
        
        <SidebarItem 
          icon={<ClipboardCheckIcon className="h-5 w-5" />} 
          href="/evaluations"
          active={path === "/evaluations"}
        >
          Évaluations
        </SidebarItem>
      </nav>
    </FadeIn>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, children, href, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

interface SidebarSubItemProps {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

function SidebarSubItem({ children, href, active, icon }: SidebarSubItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
