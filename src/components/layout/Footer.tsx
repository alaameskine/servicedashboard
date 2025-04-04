
import { cn } from "@/lib/utils";
import { FadeIn } from "../animations/FadeIn";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <FadeIn className={cn("w-full py-8 mt-20", className)}>
      <div className="container">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Portail RH</h3>
            <p className="text-sm text-muted-foreground">
              Rationalisation des processus RH pour les chefs de service et les responsables d'équipe.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutoriels</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Modèles</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">À propos</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Carrières</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Presse</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Mentions légales</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Conditions</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Licences</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portail RH. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
