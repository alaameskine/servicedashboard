
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "../animations/FadeIn";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: string;
}

const teamMembersData: TeamMember[] = [
  { name: "Fonctionnaire 1", role: "Développeur Senior", avatar: "F1", status: "active" },
  { name: "Fonctionnaire 2", role: "Chargé de projet", avatar: "F2", status: "meeting" },
  { name: "Fonctionnaire 3", role: "Designer UX", avatar: "F3", status: "away" },
  { name: "Fonctionnaire 4", role: "Développeur Backend", avatar: "F4", status: "active" },
];

export function TeamStatus() {
  return (
    <FadeIn delay={250}>
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Statut de l'équipe</h3>
          <div className="space-y-4">
            {teamMembersData.map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
                  member.status === 'active' ? 'bg-green-100 text-green-800' : 
                  member.status === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status === 'active' ? 'Présent' : 
                   member.status === 'meeting' ? 'En réunion' : 'Absent'}
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <Link to="/employes">
            <Button variant="outline" className="w-full" size="sm">
              <UsersIcon className="mr-2 h-4 w-4" />
              Voir tous les fonctionnaires
            </Button>
          </Link>
        </div>
      </Card>
    </FadeIn>
  );
}
