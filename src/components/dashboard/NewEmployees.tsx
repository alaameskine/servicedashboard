
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "../animations/FadeIn";
import { Employee } from "@/pages/Employes";

interface NewEmployeesProps {
  newEmployees: Employee[];
  employees: Employee[];
}

export function NewEmployees({ newEmployees, employees }: NewEmployeesProps) {
  // Use newEmployees from props with proper fallback
  const displayEmployees = newEmployees.length > 0 ? newEmployees : [];

  return (
    <FadeIn delay={300}>
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Nouveaux Fonctionnaires</h3>
            <Link to="/employes">
              <Button variant="ghost" size="sm" className="text-primary">
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {displayEmployees.map((employee, index) => (
              <div key={employee.id} className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
                <Avatar>
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {employee.prenom?.substring(0, 1) || "F"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{`${employee.prenom} ${employee.nom}`}</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Nouveau
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{employee.poste}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Arrivé le {new Date(employee.dateArrivee).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
            
            {displayEmployees.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <p>Aucun nouveau fonctionnaire à afficher</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Link to="/employes">
              <Button variant="outline" className="w-full" size="sm">
                Voir tous les fonctionnaires
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
