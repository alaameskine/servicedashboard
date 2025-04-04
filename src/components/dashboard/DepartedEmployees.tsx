
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "../animations/FadeIn";

interface DepartedEmployee {
  name: string;
  role: string;
  avatar: string;
  endDate: string;
  reason: string;
}

// Données des fonctionnaires qui sont partis
const departedEmployeesData: DepartedEmployee[] = [
  { name: "Fonctionnaire 5", role: "Chargé d'études", avatar: "F5", endDate: "10/04/2023", reason: "Mutation" },
  { name: "Fonctionnaire 6", role: "Assistante administrative", avatar: "F6", endDate: "28/02/2023", reason: "Retraite" },
];

export function DepartedEmployees() {
  return (
    <FadeIn delay={350}>
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Fonctionnaires sortants</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <UserMinus className="mr-2 h-4 w-4" />
              Archiver
            </Button>
          </div>
          <div className="space-y-4">
            {departedEmployeesData.map((employee, i) => (
              <div key={i} className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
                <Avatar>
                  <AvatarFallback className="bg-red-100 text-red-800">
                    {employee.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{employee.name}</p>
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
                      Sortant
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                </div>
                <div className="text-xs">
                  <div className="text-muted-foreground">Sorti le {employee.endDate}</div>
                  <div className="text-red-600">{employee.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
